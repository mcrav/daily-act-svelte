import type { Exercise } from '$lib/data/exercises';
import type { ChatMessage } from '$lib/types/chat';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import z from 'zod';

const model = new ChatOpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	modelName: 'gpt-4.1-mini',
});

const responseSchema = z.object({
	content: z.string(),
	timer: z.number(),
});

const promptTemplate = ChatPromptTemplate.fromMessages([
	[
		'system',
		`
    You are an acceptance and commitment therapy (ACT) coach.
    The user is working on this exercise:

    The next step is this: {nextStepContent}

	You should use this for general meaning, but personalise it to naturally flow in the chat.

	  When replying:
	- Acknowledge what the user has specifically said, don't be generic.
    - Always give the next step of the exericse, don't make up your own steps.
    - You should reword each step so that it flows naturally in the conversation, but don't change the fundamental meaning of the step.
    - Be non judgemental and show you accept and understand the user's feelings.

	When replying you should include the personalised reply content, and can specify a timer if it is included in the next step. If no timer is in the next step, just return 0 for timer.
		`,
	],
	new MessagesPlaceholder('msgs'),
]);

export async function generateChatReply({
	message,
	exercise,
	currentStepIndex,
	chatHistory,
}: {
	message?: string;
	exercise: Exercise;
	currentStepIndex: number;
	chatHistory: ChatMessage[];
}) {
	const prompt = await promptTemplate.invoke({
		message,
		nextStepContent: exercise.steps[currentStepIndex + 1].content,
		msgs: [
			...chatHistory.map((msg) => {
				if (msg.isUser) {
					return new HumanMessage(msg.content);
				} else {
					return new AIMessage(msg.content);
				}
			}),
			new HumanMessage(message || ''),
		],
	});

	const structuredModel = model.withStructuredOutput(responseSchema);
	const response = await structuredModel.invoke(prompt);

	return {
		newStepIndex: currentStepIndex + 1,
		reply: {
			content: response.content,
			timer: response.timer || undefined,
		},
	};
}
