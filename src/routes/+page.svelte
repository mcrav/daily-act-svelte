<script lang="ts">
	import ExerciseStep from '$lib/components/ExerciseStep/ExerciseStep.svelte';
	import ExerciseTitle from '$lib/components/ExerciseTitle/ExerciseTitle.svelte';
	import OnboardingModal from '$lib/components/OnboardingModal/OnboardingModal.svelte';
	import { exerciseCategories, exercises, type Exercise } from '$lib/data/exercises';
	import {
		cleanLocalStorage,
		getOnboardingLocalStorageKey,
		getPrivacyModalLocalStorageKey,
	} from '$lib/utils/local-storage-repo';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import axios from 'axios';
	import {
		freeroamExerciseMachine,
		FreeroamExerciseMachineEventType,
		FreeroamState,
	} from '$lib/utils/freeroam-state-machine';
	import { useMachine } from '@xstate/svelte';
	import { PUBLIC_SITE_ENV } from '$env/static/public';
	import PrivacyModal from '$lib/components/PrivacyModal/PrivacyModal.svelte';
	import confetti from 'canvas-confetti';
	import TypingIndicator from '$lib/components/TypingIndicator/TypingIndicator.svelte';
	import BrowseExercisesModal from '$lib/components/BrowseExercisesModal/BrowseExercisesModal.svelte';
	import ContentPage from '$lib/components/ContentPage/ContentPage.svelte';
	import { selectExercises } from '$lib/utils/select-exercises';
	import { getTodayDateString } from '$lib/utils/datetime';
	import { createMutation } from '@tanstack/svelte-query';
	import type { ChatMessage } from '$lib/types/chat';
	import { get } from 'svelte/store';

	const chatMutation = createMutation({
		mutationFn: async ({
			message,
			exercise,
			currentStepIndex,
			chatHistory,
		}: {
			message: string | undefined;
			exercise: Exercise;
			currentStepIndex: number;
			chatHistory: ChatMessage[];
		}) => {
			const response = await axios.post('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					message,
					exercise,
					currentStepIndex,
					chatHistory,
				},
			});
			return response.data;
		},
	});

	function handleOnboardingModalClose() {
		send({ type: FreeroamExerciseMachineEventType.DismissOnboarding });
		window.localStorage.setItem(onboardedLSKey, 'true');
	}

	const onboardedLSKey = getOnboardingLocalStorageKey();

	const handleContinue = async (message?: string) => {
		if (continueDisabled || !$snapshot.context.currentExercise) {
			return;
		}

		send({ type: FreeroamExerciseMachineEventType.AcknowledgeUserMessage, message });

		// Last step
		if ($snapshot.context.currentStepIndex === $snapshot.context.currentExercise.steps.length - 1) {
			send({ type: FreeroamExerciseMachineEventType.NextStep, reply: { content: '' } });
			setTimeout(() => {
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 1 },
				});
			}, 2200);
			return;
		}

		const { reply } = await get(chatMutation).mutateAsync({
			message,
			exercise: $snapshot.context.currentExercise,
			currentStepIndex: $snapshot.context.currentStepIndex,
			chatHistory: $snapshot.context.chat,
		});

		send({ type: FreeroamExerciseMachineEventType.NextStep, reply });
	};

	const { send, snapshot } = useMachine(freeroamExerciseMachine, {
		systemId: 'freeroamExerciseMachine',
	});

	const privacyModalLSKey = getPrivacyModalLocalStorageKey();

	let isPrivacyModalShown = $state(false);
	let isPrivacyModalOpen = $state(false);

	function handlePrivacyModalClose() {
		isPrivacyModalShown = true;
		isPrivacyModalOpen = false;
		window.localStorage.setItem(privacyModalLSKey, 'true');
	}
	function handleChatInputClick() {
		if (!isPrivacyModalShown) {
			isPrivacyModalOpen = true;
		}
	}

	onMount(() => {
		const isOnboarded = window.localStorage.getItem(onboardedLSKey) === 'true';
		isPrivacyModalShown = window.localStorage.getItem(privacyModalLSKey) === 'true';
		send({
			type: FreeroamExerciseMachineEventType.Initialize,
			ctx: {
				isOnboarded,
				isStarted: false,
				chat: [],
				suggestedExercises: [],
				currentExercise: undefined,
				completedExercises: [],
				queuedMessages: [],
				isTyping: false,
				currentStepIndex: 0,
			},
		});

		// Remove previous days state from local storage
		cleanLocalStorage();
	});

	const continueDisabled = $derived(
		[FreeroamState.SendingMessageA, FreeroamState.SendingMessageB].includes($snapshot.value),
	);

	let isBrowsingExercises = $state(false);

	const exerciseOfTheDay = selectExercises(Object.values(exercises), getTodayDateString());

	const categories = ['Acceptance', 'Values', 'Defusion', 'Mindfulness', 'Misc'];
	if (PUBLIC_SITE_ENV === 'dev') {
		categories.push('Buddhist');
	}
</script>

<svelte:head>
	<title>{m.title()}</title>
	<meta
		name="description"
		content="Daily ACT exercises"
	/>
</svelte:head>

{#snippet endOfChatSnippet()}
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
		{#each $snapshot.context.suggestedExercises as exercise (exercise.id)}<button
				class="btn preset-tonal font-semibold"
				onclick={() => {
					send({
						type: FreeroamExerciseMachineEventType.StartExercise,
						ctx: { exerciseId: exercise.id },
					});
				}}>{exercise.title} {exercise.emoji}</button
			>{/each}
		<button
			class="btn preset-tonal font-semibold"
			onclick={() => {
				isBrowsingExercises = true;
			}}>Something else...</button
		>
	</div>
{/snippet}

<PrivacyModal
	isOpen={isPrivacyModalOpen}
	onClose={handlePrivacyModalClose}
/>

<!-- Gently fade in loading animation after 1s if state is taking a while to load -->
{#if $snapshot.value === FreeroamState.Idle}
	<div class="loader fixed flex h-screen w-screen items-center justify-center">
		<TypingIndicator />
	</div>
{/if}

{#if $snapshot.value !== FreeroamState.Ready && $snapshot.context.currentExercise}
	<ExerciseTitle
		title={`${$snapshot.context.currentExercise.emoji} ${$snapshot.context.currentExercise.title}`}
		currentStepIndex={$snapshot.context.currentStepIndex}
		totalSteps={$snapshot.context.currentExercise.steps.length}
	/>
{/if}
<BrowseExercisesModal
	isOpen={isBrowsingExercises}
	onClose={() => (isBrowsingExercises = false)}
	onSelectExercise={(exerciseId) => {
		isBrowsingExercises = false;
		send({ type: FreeroamExerciseMachineEventType.StartExercise, ctx: { exerciseId } });
	}}
/>

{#if $snapshot.value === FreeroamState.Onboarding}
	<div
		class="bg-surface-100-900 fixed inset-0 z-50 flex h-screen w-screen items-center justify-center opacity-90"
	>
		<TypingIndicator />
	</div>
{/if}
<OnboardingModal
	isOpen={$snapshot.value === FreeroamState.Onboarding}
	onClose={handleOnboardingModalClose}
/>
{#if $snapshot.value === FreeroamState.Ready}
	<ContentPage>
		<div class="mb-16 flex flex-col items-center gap-2">
			<p class="text-center text-2xl font-bold">Exercise of the Day</p>
			<button
				class="btn preset-filled max-w-96 min-w-full font-semibold sm:min-w-96"
				onclick={() => {
					send({
						type: FreeroamExerciseMachineEventType.StartExercise,
						ctx: { exerciseId: exerciseOfTheDay[0].id },
					});
				}}>{exerciseOfTheDay[0].title} {exerciseOfTheDay[0].emoji}</button
			>
		</div>
		<!-- <h2 class="text-center text-2xl font-semibold">All Exercises</h2> -->
		{#each categories as category (category)}
			<div class="my-5 rounded-xl border border-neutral-200 p-5 dark:border-neutral-700">
				<h2 class="mb-3 text-center text-lg font-semibold uppercase">{category}</h2>
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{#each exerciseCategories[category.toLowerCase()] as exercise (exercise.id)}
						<button
							class="btn preset-tonal font-semibold"
							onclick={() => {
								send({
									type: FreeroamExerciseMachineEventType.StartExercise,
									ctx: { exerciseId: exercise.id },
								});
							}}>{exercise.title} {exercise.emoji}</button
						>
					{/each}
				</div>
			</div>
		{/each}
	</ContentPage>
{:else}
	<main class="mx-auto flex h-full w-full flex-col overflow-hidden px-5 sm:w-[768px]">
		<div class="relative h-full w-full overflow-hidden">
			{#if $snapshot.context.currentExercise && [FreeroamState.ExerciseStep, FreeroamState.SendingMessageA, FreeroamState.FinishedExercise, FreeroamState.SendingMessageB].some( (state) => $snapshot.matches(state), )}
				<ExerciseStep
					isTyping={$snapshot.context.queuedMessages.length > 0 || $snapshot.context.isTyping}
					chat={$snapshot.context.chat}
					stepIndex={$snapshot.context.currentStepIndex}
					totalSteps={$snapshot.context.currentExercise.steps.length}
					step={$snapshot.context.currentExercise.steps[$snapshot.context.currentStepIndex]}
					onContinue={handleContinue}
					onInputClick={handleChatInputClick}
					endOfChat={[FreeroamState.FinishedExercise].some((state) => $snapshot.matches(state))
						? endOfChatSnippet
						: undefined}
				/>
			{/if}
		</div>
	</main>
{/if}

<style>
	.loader {
		/* Initial state - invisible */
		opacity: 0;

		/* Animation settings */
		animation-name: fadeIn;
		animation-duration: 1s;
		animation-fill-mode: forwards;
		animation-delay: 1s; /* 1 second delay before starting */
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
