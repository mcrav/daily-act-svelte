import { getTodayDateString } from './datetime';

const STATE_PREFIX = 'daily-act-state__';

export function getTodayLocalStorageKey() {
	return STATE_PREFIX + getTodayDateString();
}

export function getOnboardingLocalStorageKey() {
	return STATE_PREFIX + 'isOnboarded';
}

export function getPrivacyModalLocalStorageKey() {
	return STATE_PREFIX + 'isOnboarded';
}

export function getDaysActiveLocalStorageKey() {
	return STATE_PREFIX + 'daysActive';
}

export function cleanLocalStorage() {
	const todayKey = getTodayLocalStorageKey();
	for (const key in localStorage) {
		if (key.startsWith(STATE_PREFIX) && key < todayKey) {
			localStorage.removeItem(key);
		}
	}
}
