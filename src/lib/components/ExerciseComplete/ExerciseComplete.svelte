<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { Exercise } from '$lib/data/exercises';

	interface Props {
		onStartBonusExercise: () => void;
		currentExercise: Exercise;
	}

	const { onStartBonusExercise, currentExercise }: Props = $props();
</script>

<div class="flex h-full flex-col justify-center py-5">
	<div class="mt-10 flex flex-1 flex-col gap-10 text-center sm:flex-0">
		<p>{m.firstComplete_paragraph1()}</p>
		<p>
			<!-- eslint-disable-next-line svelte/no-at-html-tags - i18n is trusted -->
			{@html m.firstComplete_bonusExercise({
				title: currentExercise.title,
				emoji: currentExercise.emoji,
			})}
		</p>
		<p>{m.firstComplete_bonusBeginQuestion()}</p>
	</div>
	<button
		class="btn preset-filled mx-auto h-14 w-full sm:mt-10 sm:max-w-64"
		onclick={onStartBonusExercise}>{m.firstComplete_bonusStart()}</button
	>
</div>
