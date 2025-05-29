import { get, writable } from 'svelte/store';

export function createTimer(timerLength: number) {
	const duration = writable(timerLength);
	const seconds = writable(timerLength);
	$effect(() => {
		if (timerLength) {
			seconds.set(timerLength);
			isStarted.set(false);
			isTouched.set(false);
			if (intervalRef) {
				clearInterval(intervalRef);
			}
		}
	});
	const isStarted = writable(false);
	const isTouched = writable(false);
	let intervalRef: NodeJS.Timeout | null = null;
	let audio: HTMLAudioElement | undefined;

	const handleFinish = () => {
		isStarted.set(false);
		if (intervalRef) {
			clearInterval(intervalRef);
			intervalRef = null;
		}
		if (!audio) {
			loadAudio();
		}
		if (!audio) {
			return;
		}
		audio.currentTime = 0;
		audio.play().catch(console.error);
	};

	const onTick = () => {
		if (get(seconds) === 0) {
			handleFinish();
			return;
		}
		seconds.update((currentValue) => currentValue - 1);
	};

	function playPauseTimer() {
		if (get(isStarted)) {
			isStarted.set(false);
			if (intervalRef) {
				clearInterval(intervalRef);
			}
		} else {
			if (get(seconds) === 0) {
				// Reset timer if it has finished
				seconds.set(get(duration));
			}
			isStarted.set(true);
			isTouched.set(true);
			if (intervalRef) {
				clearInterval(intervalRef);
			}
			intervalRef = setInterval(onTick, 1000);
			if (!audio) {
				loadAudio();
			}
		}
	}

	function loadAudio() {
		audio = new Audio('/real-bell.mp3');
	}

	function resetTimer(newDuration?: number) {
		// Reset and update duration
		if (newDuration) {
			duration.set(newDuration);
			seconds.set(newDuration);
			// Reset to current duration
		} else {
			seconds.set(get(duration) || 0);
		}
		isStarted.set(false);
		if (intervalRef) {
			clearInterval(intervalRef);
			intervalRef = null;
		}
	}

	return {
		seconds,
		playPauseTimer,
		resetTimer,
		isStarted,
		isTouched,
	};
}
