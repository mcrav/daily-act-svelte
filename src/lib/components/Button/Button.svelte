<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant: 'filled' | 'outlined' | 'tonal';
		disabled?: boolean;
	}
	const { type, variant, disabled, onclick, ...rest }: Props = $props();
</script>

<button
	type={type || 'button'}
	{disabled}
	class={`btn preset-${variant} h-14 w-full font-semibold uppercase outline-none ${rest.class || ''}`}
	{onclick}>{@render rest.children?.()}</button
>
