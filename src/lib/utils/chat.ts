import type { ChatMessage } from './local-storage-repo';

type ChatMessageOptions = {
	content: string;
	isUser: boolean;
	timer?: number;
};

export function appendMessage(chat: ChatMessage[], message: ChatMessageOptions) {
	return [
		...chat,
		{
			...message,
			id: crypto.randomUUID(),
		},
	];
}

export function createBotMessage({
	content,
	timer,
}: {
	content: string;
	timer?: number;
}): ChatMessage {
	return {
		content,
		timer,
		id: crypto.randomUUID(),
		isUser: false,
	};
}
export function createUserMessage(content: string): ChatMessage {
	return {
		content,
		id: crypto.randomUUID(),
		isUser: true,
	};
}
