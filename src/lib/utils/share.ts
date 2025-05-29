import { getTodayDateString } from './datetime';
import { GENERIC_GOOD_VIBES_EMOJIS } from './emojis';
import { randomSample } from './random-sample';

type ShareData = {
	files?: File[];
	text?: string;
	title?: string;
	url?: string;
};
export function getCommitmentShareContent({
	daysActive,
	commitment,
}: {
	daysActive: number;
	commitment: string;
}): ShareData {
	return {
		text: `Daily ACT, day ${daysActive + 1} ${randomSample([...GENERIC_GOOD_VIBES_EMOJIS], getTodayDateString())}\n\n${commitment}`,
	};
}
