export type ChatMessage = {
	id: string;
	content: string;
	isUser: boolean;
	timer?: number;
};
