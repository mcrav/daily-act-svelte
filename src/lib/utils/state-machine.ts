import { assign, sendTo, setup } from 'xstate';
import { type Exercise } from '$lib/data/exercises';
import { appendMessage, createBotMessage, createUserMessage } from '$lib/utils/chat';
import type { ChatMessage } from '$lib/utils/local-storage-repo';
import * as m from '$lib/paraglide/messages';
import { AnalyticsEvent } from './analytics';

export interface ExerciseMachineContext {
	isOnboarded: boolean;
	isStarted: boolean;
	isFinishedMainExercise: boolean;
	isCommitted: boolean | undefined;
	exercises: Exercise[];
	chat: ChatMessage[];
	currentExerciseIndex: number;
	currentStepIndex: number;
	currentExercise: Exercise;
	queuedMessages: ChatMessage[];
	daysActive: number;
}

export enum ExerciseMachineEventType {
	Initialize = 'INITIALIZE',
	DismissOnboarding = 'DISMISS_ONBOARDING',
	Start = 'START',
	NextStep = 'NEXT_STEP',
	CommitmentYes = 'COMMITMENT_YES',
	CommitmentNo = 'COMMITMENT_NO',
}

type ExerciseMachineEvent =
	| {
			type: ExerciseMachineEventType.Initialize;
			ctx: ExerciseMachineContext;
	  }
	| {
			type: ExerciseMachineEventType.DismissOnboarding;
	  }
	| {
			type: ExerciseMachineEventType.Start;
	  }
	| {
			type: ExerciseMachineEventType.NextStep;
			message?: string;
	  }
	| {
			type: ExerciseMachineEventType.CommitmentYes;
	  }
	| {
			type: ExerciseMachineEventType.CommitmentNo;
	  };

export enum State {
	Idle = 'IDLE',
	Routing = 'ROUTING',
	Onboarding = 'ONBOARDING',
	Ready = 'READY',
	ExerciseStep = 'EXERCISE_STEP',
	FinishedMainExercise = 'FINISHED_MAIN_EXERCISE',
	Committed = 'COMMITTED',
	SendingMessageA = 'SENDING_MESSAGE_A',
	SendingMessageB = 'SENDING_MESSAGE_B',
	AfterMessageRouting = 'AFTER_MESSAGE_ROUTING',
}

enum Delay {
	Bot = 'bot',
}

// Create the state machine
export const exerciseMachine = setup({
	types: {
		context: {} as ExerciseMachineContext,
		events: {} as ExerciseMachineEvent,
	},
	delays: {
		[Delay.Bot]: 1500,
	},
	guards: {
		isOnboarded: ({ context }) => context.isOnboarded,
		isFinishedMainExercise: ({ context }) =>
			context.isFinishedMainExercise && context.isCommitted === undefined,
		isLastStepMainExercise: ({ context }) => {
			return (
				context.currentExerciseIndex === 0 &&
				context.currentStepIndex === context.currentExercise.steps.length - 1
			);
		},
		isMultipleQueuedMessages: ({ context }) => context.queuedMessages.length > 1,
		isQueuedMessages: ({ context }) => context.queuedMessages.length > 0,
		isCommitted: ({ context }) => context.isCommitted !== undefined,
		isStarted: ({ context }) => context.isStarted,
		isInvalidShareCommitmentStep: ({ context, event }) => {
			if (event.type !== ExerciseMachineEventType.NextStep) {
				return false;
			}
			const step = context.currentExercise.steps[context.currentStepIndex + 1];
			if (!step) {
				return false;
			}
			if (!step.shareCommitment) {
				return false;
			}
			if (!event.message) {
				return true;
			}
			return false;
		},
	},
	actions: {
		trackFinishMainExercise: () => {
			if (!window.plausible) {
				return;
			}
			window.plausible(AnalyticsEvent.FinishMainExercise);
		},
		trackFinishBonusExercise: () => {
			if (!window.plausible) {
				return;
			}
			window.plausible(AnalyticsEvent.FinishBonusExercise);
		},
	},
}).createMachine({
	id: 'exercise',
	initial: State.Idle,
	context: {
		isOnboarded: false,
		isStarted: false,
		isFinishedMainExercise: false,
		isCommitted: undefined,
		exercises: [],
		currentExerciseIndex: 0,
		currentStepIndex: 0,
		chat: [],
		queuedMessages: [],
		daysActive: 0,
		currentExercise: {
			steps: [],
			title: '',
			emoji: '',
			id: '',
			tags: [],
			weight: 0,
			minimumTime: 0,
		},
	},
	states: {
		[State.Idle]: {
			on: {
				[ExerciseMachineEventType.Initialize]: {
					target: State.Routing,
					actions: assign(({ event }) => event.ctx),
				},
			},
		},
		[State.Ready]: {
			on: {
				[ExerciseMachineEventType.Start]: {
					target: State.SendingMessageA,
					actions: assign(({ context }) => ({
						...context,
						isStarted: true,
						currentStepIndex: -1,
						queuedMessages: [createBotMessage(context.exercises[0].steps[0])],
					})),
				},
			},
		},
		[State.Routing]: {
			always: [
				{
					target: State.SendingMessageA,
					guard: 'isQueuedMessages',
				},
				{
					target: State.Committed,
					guard: 'isCommitted',
				},
				{
					target: State.FinishedMainExercise,
					guard: 'isFinishedMainExercise',
				},
				{
					target: State.ExerciseStep,
					guard: 'isStarted',
				},
				{
					target: State.Ready,
					guard: 'isOnboarded',
				},
				{
					target: State.Onboarding,
				},
			],
		},
		// Two identical sending message states required, as delayed self transitions don't work in xstate
		[State.SendingMessageA]: {
			after: {
				[Delay.Bot]: [
					{
						guard: 'isMultipleQueuedMessages',
						actions: assign(({ context }) => ({
							...context,
							chat: appendMessage(context.chat, context.queuedMessages[0]),
							queuedMessages: context.queuedMessages.slice(1),
						})),
						target: State.SendingMessageB,
					},
					{
						target: State.AfterMessageRouting,
						actions: assign(({ context }) => ({
							...context,
							chat: appendMessage(context.chat, context.queuedMessages[0]),
							queuedMessages: context.queuedMessages.slice(1),
						})),
					},
				],
			},
		},
		[State.SendingMessageB]: {
			after: {
				[Delay.Bot]: [
					{
						guard: 'isMultipleQueuedMessages',
						actions: assign(({ context }) => ({
							...context,
							chat: appendMessage(context.chat, context.queuedMessages[0]),
							queuedMessages: context.queuedMessages.slice(1),
						})),
						target: State.SendingMessageA,
					},
					{
						target: State.AfterMessageRouting,
						actions: assign(({ context }) => ({
							...context,
							chat: appendMessage(context.chat, context.queuedMessages[0]),
							queuedMessages: context.queuedMessages.slice(1),
						})),
					},
				],
			},
		},
		[State.AfterMessageRouting]: {
			always: [
				{
					guard: 'isCommitted',
					target: State.Committed,
				},
				{
					guard: 'isLastStepMainExercise',
					actions: assign(({ context }) => ({
						...context,
						isFinishedMainExercise: true,
					})),
					target: State.FinishedMainExercise,
				},
				{
					actions: assign(({ context }) => ({
						...context,
						currentStepIndex: context.currentStepIndex + 1,
					})),
					target: State.ExerciseStep,
				},
			],
		},
		[State.ExerciseStep]: {
			on: {
				[ExerciseMachineEventType.NextStep]: [
					{
						guard: 'isLastStepMainExercise',
						actions: [
							assign(({ context, event }) => ({
								...context,
								daysActive: context.daysActive + 1,
								chat: event.message
									? appendMessage(context.chat, createUserMessage(event.message))
									: context.chat,
								queuedMessages: [
									createBotMessage({ content: m.firstComplete_paragraph1() }),
									createBotMessage({
										content: m.complete_commitmentQuestion(),
									}),
								],
							})),
							'trackFinishMainExercise',
						],
						target: State.SendingMessageA,
					},
					{
						guard: 'isInvalidShareCommitmentStep',
						actions: [
							assign(({ context }) => ({
								...context,
								currentStepIndex: context.currentStepIndex + 1,
							})),
							sendTo(
								({ system }) => system.get('exerciseMachine'),
								() => ({
									type: ExerciseMachineEventType.NextStep,
								}),
							),
						],
					},
					{
						actions: assign(({ context, event }) => ({
							...context,
							chat: event.message
								? appendMessage(context.chat, createUserMessage(event.message))
								: context.chat,
							queuedMessages: [
								createBotMessage(context.currentExercise.steps[context.currentStepIndex + 1]),
							],
						})),
						target: State.SendingMessageA,
					},
				],
			},
		},
		[State.Onboarding]: {
			on: {
				[ExerciseMachineEventType.DismissOnboarding]: {
					target: State.Ready,
					actions: assign(({ context }) => ({
						...context,
						isOnboarded: true,
					})),
				},
			},
		},
		[State.FinishedMainExercise]: {
			on: {
				[ExerciseMachineEventType.CommitmentYes]: {
					actions: assign(({ context }) => ({
						...context,
						isCommitted: true,
						chat: appendMessage(context.chat, createUserMessage('Yes')),
						queuedMessages: [createBotMessage({ content: 'Great, see you again tomorrow!' })],
					})),
					target: State.SendingMessageA,
				},
				[ExerciseMachineEventType.CommitmentNo]: {
					actions: assign(({ context }) => ({
						...context,
						isCommitted: false,
						chat: appendMessage(context.chat, createUserMessage('No')),
						queuedMessages: [createBotMessage({ content: 'No worries, see you again soon!' })],
					})),
					target: State.SendingMessageA,
				},
			},
		},
		[State.Committed]: {},
	},
});
