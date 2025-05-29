import { assign, setup } from 'xstate';
import { exercises } from '$lib/data/exercises';
import { appendMessage, createBotMessage, createUserMessage } from '$lib/utils/chat';
import type { ChatMessage } from '$lib/types/chat';
import seedrandom from 'seedrandom';
import { weightedRandomSample } from './weighted-random-sample';
import { randomSample } from './random-sample';
import { AnalyticsEvent } from './analytics';
import type { Exercise, ExerciseStep } from '$lib/types/exercises';

export interface FreeroamExerciseMachineContext {
	isOnboarded: boolean;
	isStarted: boolean;
	chat: ChatMessage[];
	currentStepIndex: number;
	currentExercise: Exercise | undefined;
	completedExercises: string[];
	queuedMessages: ChatMessage[];
	suggestedExercises: Exercise[];
	isTyping: boolean;
}

export enum FreeroamExerciseMachineEventType {
	Initialize = 'INITIALIZE',
	DismissOnboarding = 'DISMISS_ONBOARDING',
	StartExercise = 'START_EXERCISE',
	AcknowledgeUserMessage = 'ACKNOWLEDGE_USER_MESSAGE',
	NextStep = 'NEXT_STEP',
	PractiseExercise = 'PRACTISE_EXERCISE',
	CommitmentYes = 'COMMITMENT_YES',
	CommitmentNo = 'COMMITMENT_NO',
	BonusExerciseYes = 'BONUS_EXERCISE_YES',
	BonusExerciseNo = 'BONUS_EXERCISE_NO',
}

type FreeroamExerciseMachineEvent =
	| {
			type: FreeroamExerciseMachineEventType.Initialize;
			ctx: FreeroamExerciseMachineContext;
	  }
	| {
			type: FreeroamExerciseMachineEventType.DismissOnboarding;
	  }
	| {
			type: FreeroamExerciseMachineEventType.StartExercise;
			ctx: { exerciseId: string };
	  }
	| {
			type: FreeroamExerciseMachineEventType.NextStep;
			reply: ExerciseStep;
	  }
	| { type: FreeroamExerciseMachineEventType.AcknowledgeUserMessage; message?: string };

export enum FreeroamState {
	Idle = 'IDLE',
	Routing = 'ROUTING',
	Onboarding = 'ONBOARDING',
	Ready = 'READY',
	ExerciseStep = 'EXERCISE_STEP',
	FinishedExercise = 'FINISHED_EXERCISE',
	SendingMessageA = 'SENDING_MESSAGE_A',
	SendingMessageB = 'SENDING_MESSAGE_B',
	AfterMessageRouting = 'AFTER_MESSAGE_ROUTING',
}

enum Delay {
	Bot = 'bot',
}

// Create the state machine
export const freeroamExerciseMachine = setup({
	types: {
		context: {} as FreeroamExerciseMachineContext,
		events: {} as FreeroamExerciseMachineEvent,
	},
	delays: {
		[Delay.Bot]: 1500,
	},
	guards: {
		isOnboarded: ({ context }) => context.isOnboarded,
		isLastStep: ({ context }) => {
			return (
				!!context.currentExercise &&
				context.currentStepIndex === context.currentExercise.steps.length - 1
			);
		},
		isMultipleQueuedMessages: ({ context }) => context.queuedMessages.length > 1,
		isQueuedMessages: ({ context }) => context.queuedMessages.length > 0,
		isStarted: ({ context }) => context.isStarted,
		isCurrentExercise: ({ context }) => !!context.currentExercise,
	},
	actions: {
		trackFinishExercise: () => {
			if (!window.plausible) {
				return;
			}
			window.plausible(AnalyticsEvent.FinishExercise);
		},
	},
}).createMachine({
	id: 'exercise',
	initial: FreeroamState.Idle,
	context: {
		isOnboarded: false,
		isStarted: false,
		currentStepIndex: 0,
		chat: [],
		queuedMessages: [],
		suggestedExercises: [],
		completedExercises: [],
		isTyping: false,
		currentExercise: undefined,
	},
	states: {
		[FreeroamState.Idle]: {
			on: {
				[FreeroamExerciseMachineEventType.Initialize]: {
					target: FreeroamState.Routing,
					actions: assign(({ event }) => event.ctx),
				},
			},
		},
		[FreeroamState.Ready]: {
			on: {
				[FreeroamExerciseMachineEventType.StartExercise]: {
					target: FreeroamState.SendingMessageA,
					actions: assign(({ context, event }) => {
						const exercise = exercises[event.ctx.exerciseId];
						if (!exercise) {
							throw new Error(`Exercise with id ${event.ctx.exerciseId} not found`);
						}
						return {
							...context,
							isStarted: true,
							currentStepIndex: -1,
							currentExercise: exercise,
							queuedMessages: [createBotMessage(exercise.steps[0])],
						};
					}),
				},
			},
		},
		[FreeroamState.Routing]: {
			always: [
				{
					target: FreeroamState.SendingMessageA,
					guard: 'isQueuedMessages',
				},
				{
					target: FreeroamState.ExerciseStep,
					guard: 'isCurrentExercise',
				},
				{
					target: FreeroamState.Ready,
					guard: 'isOnboarded',
				},
				{
					target: FreeroamState.Onboarding,
				},
			],
		},
		// Two identical sending message states required, as delayed self transitions don't work in xstate
		[FreeroamState.SendingMessageA]: {
			after: {
				[Delay.Bot]: [
					{
						guard: 'isMultipleQueuedMessages',
						actions: assign(({ context }) => ({
							...context,
							chat: appendMessage(context.chat, context.queuedMessages[0]),
							queuedMessages: context.queuedMessages.slice(1),
						})),
						target: FreeroamState.SendingMessageB,
					},
					{
						target: FreeroamState.AfterMessageRouting,
						actions: assign(({ context }) => ({
							...context,
							chat: appendMessage(context.chat, context.queuedMessages[0]),
							queuedMessages: context.queuedMessages.slice(1),
						})),
					},
				],
			},
		},
		[FreeroamState.SendingMessageB]: {
			after: {
				[Delay.Bot]: [
					{
						guard: 'isMultipleQueuedMessages',
						actions: assign(({ context }) => ({
							...context,
							chat: appendMessage(context.chat, context.queuedMessages[0]),
							queuedMessages: context.queuedMessages.slice(1),
						})),
						target: FreeroamState.SendingMessageA,
					},
					{
						target: FreeroamState.AfterMessageRouting,
						actions: assign(({ context }) => ({
							...context,
							chat: appendMessage(context.chat, context.queuedMessages[0]),
							queuedMessages: context.queuedMessages.slice(1),
						})),
					},
				],
			},
		},
		[FreeroamState.AfterMessageRouting]: {
			always: [
				{
					guard: 'isLastStep',
					actions: assign(({ context }) => ({
						...context,
						isTyping: false,
						currentStepIndex: context.currentStepIndex + 1,
					})),
					target: FreeroamState.FinishedExercise,
				},
				{
					actions: assign(({ context }) => ({
						...context,
						isTyping: false,
						currentStepIndex: context.currentStepIndex + 1,
					})),
					target: FreeroamState.ExerciseStep,
				},
			],
		},
		[FreeroamState.ExerciseStep]: {
			on: {
				[FreeroamExerciseMachineEventType.AcknowledgeUserMessage]: {
					actions: assign(({ context, event }) => ({
						...context,
						chat: appendMessage(context.chat, createUserMessage(event.message || '')),
						isTyping: true,
					})),
					target: FreeroamState.ExerciseStep,
				},
				[FreeroamExerciseMachineEventType.NextStep]: [
					{
						guard: 'isLastStep',
						actions: [
							assign(({ context }) => {
								const completedExercises = context.currentExercise
									? [...context.completedExercises, context.currentExercise.id]
									: context.completedExercises;
								const allExercises = Object.values(exercises);
								return {
									...context,
									isTyping: false,
									completedExercises,
									suggestedExercises:
										completedExercises.length <= allExercises.length - 3
											? weightedRandomSample(
													allExercises.filter(
														(exercise) => !completedExercises.includes(exercise.id),
													),
													3,
													seedrandom(),
												)
											: // When all exercises have been completed, just sample entire array
												weightedRandomSample(allExercises, 3, seedrandom()),
									queuedMessages: [
										createBotMessage({
											content: randomSample([
												'Well done for finishing the exercise!',
												'Well done, the people around you will appreciate the effort!',
											]),
										}),
										createBotMessage({ content: 'Would you like to keep practising?' }),
									],
								};
							}),
							'trackFinishExercise',
						],
						target: FreeroamState.SendingMessageA,
					},
					{
						actions: assign(({ context, event }) => ({
							...context,
							chat: event.reply
								? appendMessage(context.chat, createBotMessage(event.reply))
								: context.chat,
						})),
						target: FreeroamState.AfterMessageRouting,
					},
				],
			},
		},
		[FreeroamState.Onboarding]: {
			on: {
				[FreeroamExerciseMachineEventType.DismissOnboarding]: {
					target: FreeroamState.Ready,
					actions: assign(({ context }) => ({
						...context,
						isOnboarded: true,
					})),
				},
			},
		},
		[FreeroamState.FinishedExercise]: {
			on: {
				[FreeroamExerciseMachineEventType.StartExercise]: {
					target: FreeroamState.SendingMessageA,
					actions: assign(({ context, event }) => {
						const exercise = exercises[event.ctx.exerciseId];
						if (!exercise) {
							throw new Error(`Exercise with id ${event.ctx.exerciseId} not found`);
						}
						return {
							...context,
							isStarted: true,
							currentStepIndex: -1,
							currentExercise: exercise,
							queuedMessages: [createBotMessage(exercise.steps[0])],
						};
					}),
				},
			},
		},
	},
});
