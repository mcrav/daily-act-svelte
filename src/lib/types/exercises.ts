export type Exercise = {
	id: string;
	title: string;
	emoji: string;
	steps: ExerciseStep[];
	tags: string[];
	weight: number;
	minimumTime: number;
};

export type ExerciseStep = {
	// Text to show the user
	content: string;
	// Optional: Number in seconds of timer to show alongside step
	timer?: number;
	// Optional: Number of messages to wait before continuing
	continueAfter?: { messages?: number; prompt?: string };
	// Optional: Don't allow user to reply, only to continue
	continueOnly?: boolean;
	// Optional: Ignore
	shareCommitment?: boolean;
};
