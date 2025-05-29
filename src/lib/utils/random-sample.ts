import seedrandom from 'seedrandom';

export function randomSample<T>(arr: Array<T>, seed?: string) {
	const rng = seedrandom(seed || undefined);
	return arr[Math.floor(rng() * arr.length)];
}
