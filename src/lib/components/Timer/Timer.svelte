<script lang="ts">
	import { formatTime } from '$lib/utils/format-time';
	import Icon from '@iconify/svelte';
	import IconButton from './components/IconButton/IconButton.svelte';

	interface Props {
		seconds: number;
		isStarted: boolean;
		onPlayPause: () => void;
		onReset: () => void;
	}

	const { seconds, isStarted, onPlayPause, onReset }: Props = $props();
</script>

<div class="mt-5 flex w-full flex-1 flex-row items-center justify-center gap-5 sm:flex-0">
	<IconButton
		onPress={onReset}
		ariaLabel="Reset Timer"
		><Icon
			icon="mdi:restart"
			class="dark:[#87aede] h-5 w-5 text-[#5b7493]"
		/></IconButton
	>
	<button
		class="relative flex h-40 w-40 items-center justify-center rounded-full border border-[#5b7493] p-4 text-center font-serif text-4xl dark:border-[#87aede]"
		onclick={onPlayPause}
	>
		{formatTime(seconds)}
	</button>
	<IconButton
		onPress={onPlayPause}
		ariaLabel="Start Timer"
		>{#if isStarted}<Icon
				icon="mdi:pause"
				class="dark:#87aede h-5 w-5 text-[#5b7493]"
			/>{:else}<Icon
				icon="mdi:play"
				class="dark:#87aede h-5 w-5 text-[#5b7493]"
			/>{/if}</IconButton
	>
</div>
