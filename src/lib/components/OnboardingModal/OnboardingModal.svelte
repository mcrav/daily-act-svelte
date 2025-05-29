<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import Button from '../Button/Button.svelte';
	import * as m from '$lib/paraglide/messages';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	const { isOpen, onClose }: Props = $props();
</script>

<Modal
	open={isOpen}
	onOpenChange={(e) => {
		if (e.open === false) {
			onClose();
		}
	}}
	triggerBase="btn preset-tonal"
	contentBase="card bg-surface-100-900 p-8 space-y-4 shadow-xl max-w-screen sm:max-w-[500px]"
	backdropClasses="backdrop-blur-sm"
	aria-label={m.onboarding_modalAriaLabel()}
>
	{#snippet content()}
		<header class="flex justify-center">
			<h2 class="h2 text-center opacity-60">{m.onboarding_heading()}</h2>
		</header>
		<article class="flex flex-col">
			<ul class="flex list-disc flex-col gap-2">
				<li>
					This app is for people already familiar with Acceptance and Commitment Therapy (ACT).
				</li>
				<li>To begin, choose an exercise and follow the instructions in the chat.</li>
				<li>
					The chat is <b>not</b> AI. All responses are predefined. This means that nothing you type leaves
					your device, so you can share your thoughts freely.
				</li>
			</ul>
		</article>
		<footer class="mt-6 flex justify-center gap-4">
			<Button
				type="button"
				variant="filled"
				onclick={onClose}>{m.onboarding_begin()}</Button
			>
		</footer>
	{/snippet}
</Modal>
