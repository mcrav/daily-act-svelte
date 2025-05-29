<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	interface Props {
		isCommitted: boolean | undefined;
		onCommitment: (value: boolean) => void;
	}

	const { isCommitted, onCommitment }: Props = $props();
</script>

{#if isCommitted === true}
	<p class="py-5 text-center">{m.complete_isCommitted()}</p>
{:else if isCommitted === false}
	<p class="py-5 text-center">{m.complete_isNotCommitted()}</p>
{:else}
	<div class="flex flex-1 flex-col sm:flex-0">
		<div class="mt-10 flex flex-1 flex-col gap-10 text-center">
			<p class="text-center">{m.complete_paragraph1()}</p>
			<p class="text-center">{m.complete_commitmentQuestion()}</p>
		</div>
		<div class="mt-0 mb-3 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
			<button
				class="btn preset-outlined h-14 w-full sm:max-w-48"
				onclick={() => onCommitment(false)}>{m.complete_commitmentNo()}</button
			>
			<button
				class="btn preset-filled h-14 w-full sm:max-w-48"
				onclick={() => onCommitment(true)}>{m.complete_commitmentYes()}</button
			>
		</div>
	</div>
{/if}
