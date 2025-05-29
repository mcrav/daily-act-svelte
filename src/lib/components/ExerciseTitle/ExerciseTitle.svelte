<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		title: string;
		currentStepIndex: number;
		totalSteps: number;
	}

	const { title, totalSteps, currentStepIndex }: Props = $props();

	onMount(() => {
		if (!window.visualViewport) {
			return;
		}
		function viewportHandler() {
			if (!window.visualViewport) {
				return;
			}
			const offsetTop = window.visualViewport.offsetTop;
			const container = document.getElementById('exerciseTitle__container');
			if (!container) {
				return;
			}
			container.style.top = `${offsetTop + 48}px`;
			if (window.visualViewport.height < 400) {
				container.style.display = 'none';
			} else {
				container.style.display = '';
			}
		}
		window.visualViewport.addEventListener('resize', viewportHandler);
		viewportHandler();
	});
</script>

<div
	id="exerciseTitle__container"
	class="bg-surface-50 dark:bg-surface-950 fixed top-12 right-0 left-0 z-50 mx-auto flex h-12 w-full max-w-[768px] items-center justify-between px-5 py-3"
>
	<h2 class="text-center text-sm font-semibold">{title}</h2>
	<div class="ml-auto inline-flex gap-2">
		<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars - it's okay not to use _ -->
		{#each Array(totalSteps) as _, i (i)}
			<div
				class={`${i <= currentStepIndex ? 'bg-[#5b7493] dark:bg-[#87aede]' : 'bg-neutral-300 dark:bg-neutral-300'} h-2 w-2 rounded-full`}
			></div>
		{/each}
	</div>
</div>
