import seedrandom from 'seedrandom';

type WeightedItem = { weight: number };

export function weightedRandomSample<T extends WeightedItem>(
	items: Array<T>,
	n: number,
	rng: seedrandom.PRNG,
): Array<T> {
	if (n > items.length) {
		throw new Error('Sample size cannot be larger than the number of items.');
	}

	const result: T[] = [];
	const itemsCopy = [...items]; // Create a copy to avoid modifying the original array

	for (let i = 0; i < n; i++) {
		// Calculate total weight for the current items
		const totalWeight = itemsCopy.reduce((sum, item) => sum + item.weight, 0);

		// Generate a random number between 0 and totalWeight
		const random = rng() * totalWeight;

		// Select an item based on its weight
		let cumulativeWeight = 0;
		for (let j = 0; j < itemsCopy.length; j++) {
			cumulativeWeight += itemsCopy[j].weight;
			if (random < cumulativeWeight) {
				// Add the selected item to the result
				result.push(itemsCopy[j]);

				// Remove the selected item from the itemsCopy array
				itemsCopy.splice(j, 1);
				break;
			}
		}
	}

	return result;
}
