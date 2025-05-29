<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
	}
	const { children, class: className }: Props = $props();
</script>

<h1 class={`mb-10 text-center text-3xl font-bold sm:text-left ${className}`}>
	{@render children?.()}
</h1>
