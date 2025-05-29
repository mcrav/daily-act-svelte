<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { type ExerciseStep as TExerciseStep } from '../../data/exercises';
	import { type ChatMessage } from '$lib/types/chat';
	import Timer from '../Timer/Timer.svelte';
	import TypingIndicator from '../TypingIndicator/TypingIndicator.svelte';
	import { useTimer } from '$lib/hooks/use-timer.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import Button from '../Button/Button.svelte';
	import Icon from '@iconify/svelte';

	interface Props {
		chat: ChatMessage[];
		step?: TExerciseStep;
		stepIndex: number;
		totalSteps: number;
		isTyping?: boolean;
		buttonGroup?: Snippet;
		endOfChat?: Snippet;
		onContinue: (message?: string) => void;
		onInputClick: () => void;
	}

	const {
		isTyping,
		chat,
		step,
		stepIndex,
		totalSteps,
		onContinue,
		buttonGroup,
		onInputClick,
		endOfChat,
	}: Props = $props();

	const { seconds, isStarted, isTouched, playPauseTimer, resetTimer } = useTimer(step?.timer || 0);

	let inputRef = $state<HTMLTextAreaElement | undefined>();

	$effect(() => {
		if (step && stepIndex > -1) {
			resetTimer(step.timer || 0);
		}
	});

	function handleContinue(message?: string) {
		resetTimer();
		if (inputRef) {
			inputRef.value = '';
		}
		onContinue(message);
	}

	onMount(() => {
		const chatDiv = document.getElementById('chatContainer') as HTMLDivElement;
		function scrollToBottom(element: HTMLDivElement) {
			setTimeout(() => {
				element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
			}, 100);
		}

		function observeDiv(div: HTMLDivElement) {
			const observer = new MutationObserver(() => scrollToBottom(div));

			observer.observe(div, { childList: true, subtree: true });
		}

		if (chatDiv) {
			observeDiv(chatDiv);

			// Scroll to bottom of chat on page refresh
			scrollToBottom(chatDiv);
		}

		const chat = document.getElementById('chatContainer');
		const viewport = window.visualViewport;
		if (!viewport) {
			return;
		}
		function viewportHandler() {
			const container = document.getElementById('container');
			const outerContainer = document.getElementById('outerContainer');
			const typingBackground = document.getElementById('exerciseStep__typingBackground');
			if (!viewport || !outerContainer || !container || !chat || !typingBackground) {
				return;
			}

			const viewportOffsetTop = viewport.offsetTop;

			container.style.height = `${viewport.height}px`;
			outerContainer.style.top = `${viewportOffsetTop}px`;

			const isCompact = viewport.height < 400;
			typingBackground.setAttribute('data-compact', isCompact ? 'true' : 'false');
			chat.setAttribute('data-compact', isCompact ? 'true' : 'false');

			// This makes it scroll to bottom when the keyboard is dismissed.
			// Slightly annoying as it means the chat scrolls to the bottom
			// when the keyboard is opened even if the user wasn't at the bottom
			// before.
			// setTimeout is needed for Safari to work
			setTimeout(() => {
				chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
			});
		}

		window.visualViewport?.addEventListener('resize', viewportHandler);
	});
	/**
	 * NOTE: The layout handling here is intense.
	 * Requirements:
	 *   - Works on Chrome Android and iOS Safari (which have different ways of handling viewport and on-screen keyboard)
	 *   - Header and ExerciseTitle stay fixed at top
	 *   - When keyboard opens input and chat move above keyboard, and chat scrolls to bottom
	 *   - When keyboard closes input and chat move back down to bottom of page, and chat scrolls to bottom
	 *
	 * This is done with a fixed outerContainer div taking visual viewport height.
	 * Elements are there positioned absolute within this container to top and bottom.
	 * absolute must be used rather than fixed, as on Safari offsetTop is the height of the on-screen keyboard,
	 * whereas on Chrome offsetTop is 0 even with the keyboard open.
	 * Therefore, you need a div that matches the visual viewport height, and to position everything relative to that.
	 */
</script>

<div
	id="outerContainer"
	class="fixed right-0 left-0 z-30 h-full w-full"
>
	<div
		class="relative flex h-full w-full justify-center"
		id="container"
	>
		<div
			id="chatContainer"
			class="absolute top-24 bottom-35 flex w-full max-w-[768px] flex-col gap-5 overflow-x-hidden overflow-y-auto overscroll-contain px-5 pt-2 pb-6 data-[compact=true]:top-12 data-[compact=true]:bottom-28 data-[compact=true]:pb-8"
		>
			{#each chat as message (message.id)}
				<div class:message={!message.isUser}>
					<span
						class:text-[#a27a10]={message.isUser}
						class:text-[#5b7493]={!message.isUser}
						class:dark:text-[#ffc01a]={message.isUser}
						class:dark:text-[#87aede]={!message.isUser}
						class="text-xs font-bold"
						>{message.isUser ? m.chat_messageUserLabel() : m.chat_messageBotLabel()}</span
					>

					<!-- eslint-disable-next-line svelte/no-at-html-tags - message content is trusted -->
					<p class="text-sm">{@html message.content.replaceAll('\n', '<br />')}</p>
				</div>
			{/each}
			{#if chat.length > 0 && chat[chat.length - 1].timer && !isTyping}
				<Timer
					onPlayPause={playPauseTimer}
					seconds={$seconds}
					onReset={() => resetTimer()}
					isStarted={$isStarted}
				/>
			{/if}
			{#if endOfChat}
				{@render endOfChat?.()}{/if}
		</div>
		<div
			id="exerciseStep__typingBackground"
			class="bg-surface-50 dark:bg-surface-950 absolute right-0 bottom-28 left-0 z-40 h-7 w-screen border-b border-b-neutral-300 data-[compact=true]:h-3 dark:border-b-neutral-500"
		></div>
		<div class="absolute bottom-30 z-50 flex w-full max-w-[768px] px-5">
			{#if isTyping}
				<TypingIndicator />
			{/if}
		</div>
		<div
			id="bottombar"
			class="bg-surface-50 dark:bg-surface-950 absolute right-0 bottom-0 left-0 flex h-28 flex-1 flex-col items-center"
		>
			<div class="relative top-0 right-0 bottom-0 left-0 h-full w-full max-w-[760px] px-5 py-2">
				{#if buttonGroup}
					{@render buttonGroup?.()}
				{:else if step?.continueOnly}
					<div class="flex h-full w-full flex-col justify-center">
						<Button
							variant="filled"
							onclick={() => handleContinue()}
							>{stepIndex === totalSteps
								? m.chat_finishButtonLabel()
								: m.chat_continueButtonLabel()}</Button
						>
					</div>
				{:else if step?.timer}
					<div class="flex h-full w-full flex-col justify-center">
						{#if $isTouched}
							<Button
								variant="filled"
								onclick={() => handleContinue()}>{m.chat_continueButtonLabel()}</Button
							>
						{:else}
							<Button
								variant="outlined"
								onclick={() => {
									playPauseTimer();
								}}>{m.chat_startTimer()}</Button
							>
						{/if}
					</div>
				{:else}
					<div class="flex h-full w-full flex-col items-center justify-center">
						<textarea
							bind:this={inputRef}
							class="input h-full w-full justify-self-start pr-16 text-sm ring-neutral-500 focus:ring-[#5b7493] dark:focus:ring-[#87aede]"
							placeholder={m.chat_inputPlaceholder()}
							onclick={onInputClick}
						></textarea>
					</div>
					<button
						class="absolute top-0 right-5 bottom-0 flex h-full flex-col justify-center"
						onclick={() => handleContinue(inputRef?.value)}
					>
						<span class="btn preset-filled mr-4 h-10 w-10 rounded-full p-0 font-semibold uppercase"
							><Icon
								icon="mdi:send-variant"
								height={20}
								width={20}
								class="ml-1"
							/></span
						>
					</button>
				{/if}
			</div>
		</div>

		<style>
			.message {
				opacity: 0;
				animation: fadeIn 0.15s ease-in forwards;
			}

			@keyframes fadeIn {
				from {
					opacity: 0;
					display: none;
				}
				to {
					opacity: 1;
					display: block;
				}
			}
		</style>
	</div>
</div>
