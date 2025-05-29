import type { Exercise } from '$lib/data/exercises';
import seedrandom from 'seedrandom';
import { weightedRandomSample } from './weighted-random-sample';

export function selectExercises(allExercises: Exercise[], date: string) {
	if (date === '2025-04-23') {
		return [allExercises.find((ex) => ex.id === 'yes-or-no') as Exercise];
	}
	const rng = seedrandom(date);
	const yesterday = new Date(date);
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayDate = yesterday.toISOString().split('T')[0];
	const yesterdayRng = seedrandom(yesterdayDate);
	const yesterdayExerciseIds = weightedRandomSample(allExercises, 1, yesterdayRng).map(
		(exercise) => exercise.id,
	);
	let todayExercises = weightedRandomSample(allExercises, 1, rng);
	let i = 0;
	// Ensure that today's exercises are not the same as yesterday's
	// And that they are generated the same for everyone
	while (todayExercises.some((exercise) => yesterdayExerciseIds.includes(exercise.id))) {
		const newRng = seedrandom(`${date}${i}`);
		todayExercises = weightedRandomSample(allExercises, 1, newRng);
		i += 1;
	}
	return todayExercises;
	// return [allExercises.find((e) => e.steps[e.steps.length - 1].shareCommitment), todayExercises[0]];
}
