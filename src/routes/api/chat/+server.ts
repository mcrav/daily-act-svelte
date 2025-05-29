import { generateChatReply } from '$lib/server/ai';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { body } = await request.json();
	const { chatHistory, message, exercise, currentStepIndex } = body;

	try {
		const response = await generateChatReply({ chatHistory, message, exercise, currentStepIndex });
		return json(response);
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Failed to fetch response' }), {
			status: 500,
		});
	}
};
