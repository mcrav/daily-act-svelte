export enum AnalyticsEvent {
	FinishExercise = 'Finish+Exercise',
	FinishMainExercise = 'Finish+Main+Exercise',
	FinishBonusExercise = 'Finish+Bonus+Exercise',
	ShareCommitment = 'Share+Commitment',
	ShareEnd = 'Share+End',
}

export function getAnalyticsEventClassName(event: AnalyticsEvent) {
	return `plausible-event-name=${event}`;
}
