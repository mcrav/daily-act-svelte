export const formatTime = (secs: number) => {
	const minutes = Math.floor(secs / 60);
	const remainingSeconds = secs % 60;
	let t = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	if (t.startsWith('0:')) {
		t = t.slice(2);
		if (t.startsWith('0')) {
			return t.slice(1);
		}
	}
	return t;
};
