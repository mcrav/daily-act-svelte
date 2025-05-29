<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import { exerciseCategories } from '$lib/data/exercises';
	import * as m from '$lib/paraglide/messages';
	import Icon from '@iconify/svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		onSelectExercise: (exerciseId: string) => void;
	}

	const { isOpen, onClose, onSelectExercise }: Props = $props();
</script>

<Modal
	open={isOpen}
	onOpenChange={(e) => {
		if (e.open === false) {
			onClose();
		}
	}}
	triggerBase="btn preset-tonal"
	contentClasses="w-screen h-screen bg-white dark:bg-surface-900 p-8 overflow-auto"
	positionerPadding="p-0"
	backdropClasses="backdrop-blur-sm"
	aria-label={m.onboarding_modalAriaLabel()}
>
	{#snippet content()}
		<button
			onclick={onClose}
			class="absolute top-2 right-2"
			><Icon
				icon="mdi:close"
				class="h-6 w-6"
			></Icon></button
		>
		{#each ['Acceptance', 'Values', 'Defusion', 'Mindfulness', 'Misc'] as category (category)}
			<div class="my-5 rounded-xl border border-neutral-300 p-5 dark:border-neutral-700">
				<h2 class="mb-3 text-center text-lg font-semibold uppercase">{category}</h2>
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{#each exerciseCategories[category.toLowerCase()] as exercise (exercise.id)}
						<button
							class="btn preset-tonal font-semibold"
							onclick={() => {
								onSelectExercise(exercise.id);
							}}>{exercise.title} {exercise.emoji}</button
						>
					{/each}
				</div>
			</div>
		{/each}
	{/snippet}
</Modal>
