<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		title: string;
	}

	const { title }: Props = $props();

	onMount(() => {
		if (!window.visualViewport) {
			return;
		}
		function viewportHandler() {
			if (!window.visualViewport) {
				return;
			}
			const offsetTop = window.visualViewport.offsetTop;
			const container = document.getElementById('header__container');
			if (!container) {
				return;
			}
			container.style.top = `${offsetTop}px`;
		}
		window.visualViewport.addEventListener('resize', viewportHandler);
		viewportHandler();
	});
</script>

<header
	id="header__container"
	class="bg-surface-50 dark:bg-surface-950 fixed top-0 right-0 left-0 z-50 h-12 border-b border-b-neutral-300 dark:border-b-neutral-300"
>
	<div class="relative flex w-full flex-row items-center justify-center gap-3 px-5 py-2">
		<a href="/">
			<div class="flex flex-row items-center gap-3">
				<h1
					class="spacing-3 text-center text-xl font-bold tracking-widest text-[#5b7493] dark:text-[#87aede]"
				>
					{title}
				</h1>
			</div>
		</a>
		<div class="absolute right-2 flex items-center gap-2">
			<a
				href="/faq"
				class="bg-surface-100 dark:bg-surface-900 text-surface-500 dark:text-surface-300 flex h-8 w-8 items-center justify-center rounded-full p-2 font-bold"
				>?</a
			>
		</div>
	</div>
</header>
