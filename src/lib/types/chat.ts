import type { Exercise } from './exercises';

export type ChatMessage = {
	id: string;
	content: string;
	isUser: boolean;
	timer?: number;
};

export type APIChatPostPayload = {
	message: string | undefined;
	exercise: Exercise;
	currentStepIndex: number;
	chatHistory: ChatMessage[];
};
