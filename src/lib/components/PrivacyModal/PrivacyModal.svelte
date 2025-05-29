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
	backdropClasses=""
	aria-label={m.onboarding_modalAriaLabel()}
>
	{#snippet content()}
		<p class="text-center">Everything you write here is private. Nothing leaves your device.</p>
		<footer class="mt-6 flex justify-center gap-4">
			<Button
				type="button"
				variant="filled"
				onclick={onClose}>Got It</Button
			>
		</footer>
	{/snippet}
</Modal>
