<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		ariaLabel: string;
		onPress: () => void;
		children: Snippet;
	}

	const { children, ariaLabel, onPress, ...rest }: Props = $props();
</script>

<button
	class="flex h-10 w-10 items-center justify-center rounded-full border border-[#5b7493] transition-colors duration-200 hover:bg-[#eaf4ff] dark:border-[#87aede] dark:hover:bg-[#43484f]"
	aria-label={ariaLabel}
	onclick={onPress}
	{...rest}
>
	{@render children?.()}
</button>
