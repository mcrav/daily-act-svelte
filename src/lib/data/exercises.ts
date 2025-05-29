import { PUBLIC_SITE_ENV } from '$env/static/public';

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

export const actExercises: Record<string, Exercise> = {
	'3-3-3-mindfulness': {
		id: '3-3-3-mindfulness',
		title: 'Three Sense Mindfulness',
		emoji: '✨',
		steps: [
			{
				content: 'Take a moment to observe your surroundings. What are 3 things you can see?',
				continueAfter: {
					messages: 3,
					prompt: 'The user has listed 3 things',
				},
			},
			{
				content: 'Now take a moment to listen. What are 3 things you can hear?',
				continueAfter: {
					messages: 3,
					prompt: 'The user has listed 3 things',
				},
			},
			{
				content:
					'Finally, bring your attention to physical sensations. What are 3 things you can feel?',
				continueAfter: {
					messages: 3,
					prompt: 'The user has listed 3 things',
				},
			},
		],
		tags: ['mindfulness'],
		weight: 5,
		minimumTime: 6,
	},
	'accepting-past-mistakes': {
		id: 'accepting-past-mistakes',
		title: 'Self-Forgiveness',
		emoji: '💗',
		steps: [
			{
				content:
					"Everyone carries moments from their past they wish they could change. Today, let's work on transforming one of these moments from a burden into a source of wisdom. What past action do you still carry with you?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Thank you for sharing that - it takes courage to look at our past openly. Rather than letting this moment define you, let's see what it taught you. What insights or understanding did you gain from this experience?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"That's valuable wisdom you've gained. Now, let's widen the lens. Our actions don't happen in isolation - they're shaped by circumstances, pressures, and the information we had at the time. What external factors influenced this situation?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Imagine someone you care about came to you, sharing this exact same experience. How would you respond to them? What would you say?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Notice how easy compassion flows for people you care about. If you\'re ready to extend this same compassion to yourself, write a statement of self-forgiveness - "I forgive myself for..." Remember, this isn\'t about forgetting, but about accepting, learning and moving forward.\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['acceptance'],
		weight: 2,
		minimumTime: 10,
	},
	'avoidance-exploration': {
		id: 'avoidance-exploration',
		title: 'Facing Avoidance',
		emoji: '🦋',
		steps: [
			{
				content:
					"Let's explore something we all do sometimes - avoiding things that make us uncomfortable. What's something you've been avoiding lately? It could be a task, conversation, feeling, or situation.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Thanks for sharing. What feelings or thoughts come up when you think about this thing you're avoiding?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'When we avoid something, it usually comes with a cost. What opportunities or experiences might you be missing out on because of this avoidance?\n',
			},
			{
				content:
					'If a close friend told you they were avoiding the same thing, what would you say to them?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For the next 30 seconds, close your eyes and deliberately welcome all your thoughts and feelings about this situation - both the comfortable and uncomfortable ones. Just let them be there, like guests in your house.\n',
				timer: 30,
			},
			{
				content:
					'If you were to take one tiny step toward this situation - something so small it feels almost too easy - what might that step be?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Remember, working with avoidance isn't about forcing yourself to do everything that scares you. It's about making room for discomfort while moving toward what matters to you. Would you be willing to try that small step you identified?\n",
				continueAfter: { messages: 1 },
			},
		],
		tags: ['acceptance', 'values'],
		weight: 3,
		minimumTime: 42,
	},
	'body-scan': {
		id: 'body-scan',
		title: 'Body Scan',
		emoji: '🧘',
		steps: [
			{
				content:
					"In this exercise, we'll pay attention to our full body. Find a comfortable position - you can sit or lie down.\n\nWhen you're ready, press continue.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Start by breathing slowly and deeply for 30 seconds. Focus on how the breath moves through your body.\n',
				timer: 30,
			},
			{
				content:
					"Now, bring your attention to your feet and toes. Notice any sensations - warmth, coolness, tingling, or pressure. There's no need to change anything, just observe.\n\nWhat sensations do you notice?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Moving up to your legs, observe any sensations in your calves, knees, and thighs. Notice areas of tension or relaxation.\n\nWhat do you feel here?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Bring your awareness to your back and spine. Notice the points where your body makes contact with the surface beneath you.\n\nWhat sensations stand out?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Focus on your shoulders and neck. These areas often hold tension. Simply observe any sensations without trying to change them.\n\nWhat do you notice in this area?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Finally, bring attention to your head and face. Notice your jaw, your forehead, the space between your eyebrows.\n\nWhat sensations are present?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Take 30 seconds to feel your whole body as one complete unit. Notice how all these parts work together.\n',
				timer: 30,
			},
			{
				content:
					'Before we finish, take one more deep breath and notice how your body feels compared to when we started.\n\nWhat differences do you notice?\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['mindfulness'],
		weight: 3,
		minimumTime: 74,
	},
	'box-breathing': {
		id: 'box-breathing',
		title: 'Box Breathing',
		emoji: '📦',
		steps: [
			{
				content:
					"Box breathing is a popular breathing technique used to maintain calm and focus. Find a comfortable position and let's begin.\n",
				continueOnly: true,
			},
			{
				content:
					"For the next 2 minutes, we'll breathe deeply through the nose, following this pattern:\n\n• Inhale for 4 counts\n• Hold for 4 counts\n• Exhale for 4 counts\n• Hold for 4 counts\n\nStart the timer when you're ready.\n",
				timer: 120,
			},
			{
				content: 'Many people feel more alert and focused at this point. How do you feel?\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['breathing', 'mindfulness'],
		weight: 4,
		minimumTime: 124,
	},
	'breath-meditation': {
		id: 'breath-meditation',
		title: 'Breath Meditation',
		emoji: '🧘‍♀️',
		steps: [
			{
				content:
					"Find a comfortable position. For 2 minutes, we're going to breathe gently through the nose, and give full attention to the sensation of breathing. If your mind wanders, just gently come back to the breath.\n\nStart the timer and close your eyes when you're ready.\n",
				timer: 120,
			},
			{
				content:
					'How was that? Take a moment to notice how you feel now compared to 2 minutes ago.\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['mindfulness'],
		weight: 5,
		minimumTime: 122,
	},
	commitments: {
		id: 'commitments',
		title: 'Commitments',
		emoji: '📜',
		steps: [
			{
				content:
					"What's one thing you want to change in your life? It can be a material thing or something more abstract like a way of being.",
				continueAfter: { messages: 1 },
			},
			{
				content: 'Why is this important to you?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Write out a commitment to making this change in the form: "I will [do this thing]".\n\nBy doing this, you will subconsciously begin acting towards this goal.\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['thinking', 'values'],
		weight: 5,
		minimumTime: 6,
	},
	compliments: {
		id: 'compliments',
		title: 'Compliments',
		emoji: '💫',
		steps: [
			{
				content:
					'Think of someone who makes your life better - it could be anyone from a close friend to someone who simply brightens your day.',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'What three qualities do you admire most about them? These could be personality traits, actions they take, or the way they make others feel.',
				continueAfter: {
					messages: 3,
					prompt: 'the user has listed at least three qualities',
				},
			},
			{
				content:
					'Sometimes we can easily see good qualities in others, but refuse to acknowledge them in ourselves. Take a moment to list three of your good qualities.',
				continueAfter: {
					messages: 3,
					prompt: 'the user has listed at least three qualities',
				},
			},
			{
				content:
					'For 30 seconds, close your eyes and focus on these positive qualities of yourself.',
				timer: 30,
			},
		],
		tags: ['thinking', 'acceptance'],
		weight: 3,
		minimumTime: 36,
	},
	'day-in-the-life': {
		id: 'day-in-the-life',
		title: 'Day in the Life',
		emoji: '🌞',
		steps: [
			{
				content: 'Choose a person that you know.',
				continueAfter: { messages: 1 },
			},
			{
				content: 'Imagine waking up as this person. What do you see when you open your eyes?',
				continueAfter: { messages: 1 },
			},
			{
				content: 'Walk through a typical day in their life. What challenges do they face?',
				continueAfter: { messages: 1 },
			},
			{
				content: 'What brings them joy or stress?',
				continueAfter: { messages: 1 },
			},
			{
				content: 'What might they be feeling and thinking?',
				continueAfter: { messages: 1 },
			},
			{
				content: 'How does imagining their perspective change the way you feel about them?',
				continueAfter: { messages: 1 },
			},
			{
				content: 'Could this understanding influence how you interact with them?',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['perspective-taking', 'connectedness', 'acceptance'],
		weight: 2,
		minimumTime: 14,
	},
	'difficult-passengers': {
		id: 'difficult-passengers',
		title: 'Difficult Passengers',
		emoji: '🚤',
		steps: [
			{
				content:
					"Imagine you're steering a boat towards something meaningful to you. What's your destination - what matters to you right now?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'As you sail, notice what difficult thoughts or feelings are showing up. These are like unwanted passengers on your boat. What thoughts or feelings are trying to stop you from reaching your destination?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"The thing to remember - you don't need to throw these passengers overboard or argue with them. You can acknowledge their presence while keeping your hands steady on the wheel. Can you sail towards what matters while these passengers are present?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Take 30 seconds to imagine yourself continuing to steer towards your destination, with all these unwanted passengers still on board. Notice that you can move forward even with difficult thoughts and feelings present.\n',
				timer: 30,
			},
			{
				content:
					'How does it feel to know you can move towards what matters even with these unwanted passengers aboard?\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['acceptance', 'values'],
		weight: 4,
		minimumTime: 38,
	},
	disobey: {
		id: 'disobey',
		title: 'Disobey',
		emoji: '🎃',
		steps: [
			{
				content:
					"In this exercise, we'll challenge the belief that we must obey our thoughts.  \n\nPick any action that you can do right now, e.g. tapping your toes.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"For 30 seconds, do this action while repeating in your head, \"I can't do this, I mustn't do this, I shouldn't do this\".",
				timer: 30,
			},
			{
				content: 'How much power did your thoughts have over your actions during this exercise?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Sometimes it feels like we have to follow rule-based thoughts. But in reality these thoughts only have as much power as we give them.\n\nIt's good to remember you always have the choice to disobey!\n",
			},
		],
		tags: ['thinking', 'defusion'],
		weight: 2,
		minimumTime: 36,
	},
	'values-inheritance': {
		id: 'values-inheritance',
		title: 'Family Values',
		emoji: '🌳',
		steps: [
			{
				content:
					"Let's explore how our values developed over time. Some values we consciously chose, while others we might have inherited from our family or culture. Both can be meaningful parts of who we are.\n\nFirst, list 3 values that were strongly emphasised in your family when growing up (For example: hard work, loyalty, humour, etc.)\n",
				continueAfter: {
					messages: 3,
					prompt: 'the user has listed at least 3 things',
				},
			},
			{
				content:
					'For each of these values, rate how important it feels to you personally now, on a scale of 0-10. Some might still resonate strongly, while others might feel less relevant to who you are.\n',
				continueAfter: {
					messages: 3,
					prompt: 'the user has rated at least 3 things on a scale of 0-10',
				},
			},
			{
				content:
					"Now, think about what values you've discovered or chosen for yourself as you've grown. What are 2-3 values that feel personally meaningful to you, but weren't necessarily emphasised in your family?\n",
				continueAfter: {
					messages: 3,
					prompt: 'the user has listed at least 3 things',
				},
			},
			{
				content:
					'Looking at both your family values and personal values, do you notice any interesting patterns? Perhaps some values evolved rather than changed completely, or maybe you found totally new ones that better express who you are.\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Sometimes we can feel guilty about developing different values from our family. But it\'s a natural part of becoming our own person.\n\nWould you be willing to write an acknowledgment that both your inherited and chosen values have helped shape who you are today? For example, "I accept that my family and chosen values shaped who I am today".\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Take a moment to write any other thoughts that occur to you as a result of this exercise.\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['values', 'acceptance'],
		weight: 3,
		minimumTime: 12,
	},
	'flexible-thinking': {
		id: 'flexible-thinking',
		title: 'Flexible Thinking',
		emoji: '🌊',
		steps: [
			{
				content:
					'This exercise is great for when we feel anxious about something specific. What do you feel worried about just now?\n',
				continueAfter: { messages: 1 },
			},
			{
				content: 'What feelings do you notice around this anxiety?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"What's your automatic interpretation of this situation (the first thing that comes into your mind when you think about it) ?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"What are alternative interpretations / outcomes? Write as many as you can.\n\nIt doesn't matter whether these interpretations are accurate or positive / negative, we're just brainstorming what's technically possible.\n",
			},
			{
				content: 'Which interpretations do you think are most likely?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Often when we're anxious, we look at things from a black or white perspective which doesn't reflect reality.\n\nWas your automatic interpretation a realistic and balanced view?\n",
				continueAfter: { messages: 1 },
			},
			{
				content: 'How do you feel about the situation now?',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['thinking', 'defusion'],
		weight: 5,
		minimumTime: 14,
	},
	'forgiveness-journey': {
		id: 'forgiveness-journey',
		title: 'Forgiveness',
		emoji: '🕊️',
		steps: [
			{
				content:
					"In this exercise, we will try to forgive someone. Take a moment to think of someone you're holding a grudge against.\n\nRemember, forgiveness isn't about excusing bad actions or forgetting what happened. It's about freeing yourself from carrying the weight of anger.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"What emotions come up when you think about this person or situation? \n\nWrite down whatever you're feeling, even if it seems contradictory or intense.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Now, write about what holding onto this grudge costs you.\n\nHow does it affect your energy, your peace of mind, or your other relationships?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Sometimes people hurt others because of their own difficulties. This doesn't excuse their actions, but it can help us understand.\n\nWhat struggles or pain might this person have been going through? What pressures or limitations might have influenced their actions?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Picture yourself at your wisest and most compassionate. From this perspective, what would you say to both:\n\n1. Your hurt self who experienced the pain.\n2. The person who caused the hurt.\n',
				continueAfter: { messages: 2 },
			},
			{
				content:
					"Let's practice releasing some of this weight. For the next 30 seconds, breathe deeply and with each exhale, imagine letting go of a small piece of the grudge - not for them, but for your own peace.\n",
				timer: 30,
			},
			{
				content:
					'Forgiveness is usually a long process, but small steps can make a big difference over time.\n\nWould you be willing to write a short statement of forgiveness? Try writing one in the form "I forgive you for..."\n',
			},
		],
		tags: ['perspective-taking', 'acceptance'],
		weight: 3,
		minimumTime: 42,
	},
	'freedom-check': {
		id: 'freedom-check',
		title: 'Freedom Check',
		emoji: '🔓',
		steps: [
			{
				content:
					"Let's explore a situation where you feel stuck or without choices. This could be about work, relationships, habits, or any area of your life where you feel constrained.\n\nWhat situation comes to mind?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'When we feel stuck, our mind often tells us "I have to..." or "I can\'t..."\n\nWhat "have to"s or "can\'t"s come up for you in this situation? List as many as you can.\n',
			},
			{
				content:
					'Let\'s challenge these constraints. For each "have to" or "can\'t", what would technically be possible, even if it feels uncomfortable or has consequences?\n\nRemember, recognizing our choices isn\'t about making reckless decisions - it\'s about seeing our situation clearly.\n',
			},
			{
				content:
					'Looking at these possibilities, what values or priorities are influencing your current choices? \n\nFor example, you might choose to stay in a challenging job because you value financial security or professional growth.\n',
			},
			{
				content:
					'Sometimes what feels like "I have to" is actually "I choose to, because..."\n\nTry rephrasing your "have to"s as "I choose to... because..."\n',
			},
			{
				content:
					"Taking responsibility for our current choices gives us freedom to make different choices.\n\nEven in constrained situations, there are often small choices we can make. What's one small choice you could make differently in this situation?\n",
				continueAfter: { messages: 1 },
			},
		],
		tags: ['thinking', 'defusion'],
		weight: 5,
		minimumTime: 12,
	},
	gratitude: {
		id: 'gratitude',
		title: 'Gratitude',
		emoji: '🙏',
		steps: [
			{
				content:
					"We often spend time thinking about problems, so it's important to balance this out by sometimes focusing on positive things.\n\nWrite 5 things that you feel grateful for just now.\n",
				continueAfter: {
					prompt: 'The user has listed at least 5 items',
					messages: 5,
				},
			},
		],
		tags: ['thinking', 'acceptance'],
		weight: 5,
		minimumTime: 2,
	},
	'growth-mindset': {
		id: 'growth-mindset',
		title: 'Learning Mindset',
		emoji: '🌱',
		steps: [
			{
				content:
					"Think of a skill you're good at now (can be anything - e.g. cooking, gaming, work skill).",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'What mistakes or setbacks did you face while developing this skill? How did you handle them?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Now think of something you're currently struggling with. What similarities do you notice between these two learning journeys?",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Based on your past success, what advice would you give yourself about your current challenge?',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['thinking', 'misc'],
		weight: 3,
		minimumTime: 8,
	},
	'legacy-reflection': {
		id: 'legacy-reflection',
		title: 'Legacy Reflection',
		emoji: '🌟',
		steps: [
			{
				content:
					"Take a moment to imagine you've lived a long and meaningful life. At your funeral, your closest friend stands up to give a speech. What would you hope they say about:\n\n1. The kind of person you were\n2. The impact you had on others\n3. What you stood for in life\n\nTake some time to think about these, and write an answer to each point.\n",
			},
			{
				content:
					'Looking at what you wrote, what does this tell you about your core values? Try to identify 3 values that stand out (e.g., creativity, courage, wisdom).\n\nWrite them down, and for each one, briefly explain why it matters to you.\n',
				continueAfter: {
					prompt: 'the user has listed 3 values and explained why they matter',
				},
			},
			{
				content:
					"Choose the value from your list that feels most important to you right now. What's one small action you could take today that would express this value?\n",
				continueAfter: { prompt: 'the user has described an action' },
			},
			{
				content:
					'Making written commitments increases our chances of following through on plans.\n\nWould you be willing to commit to this action? If so, write a commitment in the form "Today, I will..."\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['values'],
		weight: 3,
		minimumTime: 8,
	},
	'life-timeline': {
		id: 'life-timeline',
		title: 'Defining Moments',
		emoji: '⚡',
		steps: [
			{
				content:
					"In this exercise, we'll explore one of your defining moments.\n\nThink of a significant event that shaped who you are today. It can be positive or challenging - both types of experiences contribute to our growth.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'What strengths or abilities did you develop through this experience? Even challenging experiences often lead to growth.\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Sometimes we can be very critical of our past selves. Looking back with acceptance, what would you say to your younger self with the wisdom you have now?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"What's one positive thing about who you are today that came from this experience?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For the next 30 seconds, close your eyes and imagine sending feelings of understanding and acceptance to your past self during this experience.\n',
				timer: 30,
			},
			{
				content:
					'Your experiences, both the joys and the challenges, have contributed to who you are today. Would you be willing to write one sentence of appreciation for your journey so far?\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['acceptance'],
		weight: 3,
		minimumTime: 40,
	},
	'music-meditation': {
		id: 'music-meditation',
		title: 'Music Meditation',
		emoji: '🎵',
		steps: [
			{
				content:
					"In this exercise, we'll practise mindfulness with some music. Choose a song you like and get ready to listen to it.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"We're going to try this:\n\n1. For 30 seconds, pay attention to one instrument or voice in the music.\n2. For 30 seconds, pay attention to how that instrument relates to the music as a whole.\n3. Repeat these steps with all the instruments or voices that you can hear.\n\nWhen you're ready, play your chosen song, close your eyes, and listen mindfully until the end.\n",
				continueOnly: true,
			},
			{
				content:
					"What did you notice about the song that you hadn't noticed before? Did focusing on individual parts change how you experienced the whole?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Sometimes we listen to songs hundreds of times without really hearing them. This same principle applies to many experiences in life - we can discover new depths in familiar things just by paying more attention.\n\nIs there anything in life that you\'d like to pay more attention to? If so, write a small commitment: "I will pay more attention to..."\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['mindfulness'],
		weight: 2,
		minimumTime: 8,
	},
	'object-meditation': {
		id: 'object-meditation',
		title: 'Object Meditation',
		emoji: '✏️',
		steps: [
			{
				content:
					'Find an object near you that catches your attention. It could be anything - a coffee mug, a plant, or your phone.\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Now look at this object as if you're seeing it for the first time. What colors, patterns, or textures do you notice?\n",
				continueAfter: { messages: 1 },
			},
			{
				content: 'Next, touch the object. How does it feel? Is it smooth, rough, warm, cool?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Imagine this object has a story to tell. Where has it been? What journey has it taken to be here with you right now?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For the next 30 seconds, keep your attention on the object. If your mind wanders, gently bring it back.\n',
				timer: 30,
			},
			{
				content:
					'Did this exercise change how you see this everyday object? Did you notice any interesting details?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Many things look very different when we pay more attention to them.\n\nIs there anything in your life you\'d like to pay more attention to? If so, write a short commitment: "I will pay more attention to..."\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['mindfulness'],
		weight: 3,
		minimumTime: 42,
	},
	'perspective-taking': {
		id: 'perspective-taking',
		title: 'Perspective Taking',
		emoji: '👥',
		steps: [
			{
				content:
					"Think of someone in your life who you'd like to understand better. This could be someone you find challenging to relate to, someone you admire, or just someone you're curious about.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Close your eyes for 30 seconds and imagine physically transforming into this person - their posture, their way of moving, their facial expressions. Try to embody them completely.\n',
				timer: 30,
			},
			{
				content:
					'Now walking as them, what immediately feels different? This could be physical sensations, emotions, or thoughts that come up.\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Looking through their eyes, what do they see when they look at you? Write honestly about how they might perceive your relationship.\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Based on this reflection, what's one specific way you could adjust your behaviour to better support or connect with this person?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Would you be willing to commit to this the next time you interact with them? If so, write "When I next talk to [this person], I will..." followed by your specific action.\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['perspective-taking', 'misc'],
		weight: 3,
		minimumTime: 40,
	},
	'relaxation-breathing': {
		id: 'relaxation-breathing',
		title: 'Relaxation Breathing',
		emoji: '🌬️',
		steps: [
			{
				content:
					"Patterns of breathing with slow exhalations are known to promote relaxation. For 2 minutes we'll breathe deeply through the nose, following this pattern:\n\n1. Inhale for 4 seconds.\n2. Hold for 13 seconds. \n3. Exhale for 13 seconds.\n\nStart the timer when you're ready.\n",
				timer: 120,
			},
		],
		tags: ['breathing', 'mindfulness'],
		weight: 5,
		minimumTime: 120,
	},
	'ripple-effect': {
		id: 'ripple-effect',
		title: 'Ripple Effect',
		emoji: '🌐',
		steps: [
			{
				content:
					'Every action we take creates ripples that affect others in ways we might not realize.\n\nThink of a small kind action someone did for you recently - maybe holding a door, giving a compliment, or sending a message when you needed it.\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'How did that small action affect your mood or behaviour afterwards? Did you treat others differently because of it?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Now think about how your own actions might create similar ripples. Write about a small action you could take today that might positively affect others.\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Writing commitments greatly increases the chances of us doing things.\n\nWould you write a commitment to your action in the form "I will..." ?\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['connectedness', 'misc'],
		weight: 3,
		minimumTime: 8,
	},
	'self-compassion-letter': {
		id: 'self-compassion-letter',
		title: 'Self-Compassion Letter',
		emoji: '💌',
		steps: [
			{
				content:
					"Think of a situation that's troubling you. Briefly describe what happened and how you feel about it.",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Now, imagine your closest friend came to you with exactly this situation.\n\nWhat would you say to them? Write it as a short letter.\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Looking at what you wrote, what strikes you about the difference between how you treat others and how you treat yourself?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Now, rewrite your letter, but address it to yourself, keeping the same compassionate tone you used for your friend.',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Take 30 seconds to pause and reflect on this message. Notice how it feels to receive this kindness from yourself.',
				timer: 30,
			},
		],
		tags: ['self-compassion', 'perspective-taking', 'acceptance'],
		weight: 3,
		minimumTime: 38,
	},
	'shared-experience': {
		id: 'shared-experience',
		title: 'Shared Experience',
		emoji: '🤝',
		steps: [
			{
				content:
					"Think of a challenge you're facing right now. It could be something small like feeling tired, or something bigger.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Now, imagine walking through a crowded street. How many of the people passing by might be dealing with something similar? Give your best guess as a number or percentage.\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Research suggests that we often underestimate how common our experiences are. When people share their struggles, most people find that many others relate to them.\n\nHow does it feel to know that others might understand exactly what you're going through?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'If you met someone dealing with the same challenge, what words of understanding would you share with them?\n',
				continueAfter: { messages: 1 },
			},
			{
				content: 'Now, can you offer those same words of understanding to yourself?\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['perspective-taking', 'connectedness', 'misc'],
		weight: 3,
		minimumTime: 10,
	},
	'silly-voice': {
		id: 'silly-voice',
		title: 'Silly Voices',
		emoji: '🎭',
		steps: [
			{
				content:
					'This exercise aims to show that negative thoughts are not as serious as they seem.\n\nHas any thought been bothering you lately? Take a moment to think of one.\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Now it's time to choose a really silly voice - it could be a cartoon character, a funny accent, or just a ridiculous way of speaking.\n\nWhat voice did you choose?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"For 30 seconds, we're going to repeat the negative thought in this silly voice.\n\nIf you're in a place where you can't speak out loud, just imagine it very vividly in your mind.\n\nThe sillier the voice, the better! Start the timer when you're ready.\n",
				timer: 30,
			},
			{
				content:
					'How did that feel? Did the thought seem less powerful when you heard it in a silly voice?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"The same words can feel very different when we change how we hear them. It's good to remember our thoughts are just thoughts - not facts or commands.\n\nIf any thoughts trouble you today, take a moment to repeat them in a silly voice.\n",
				continueOnly: true,
			},
		],
		tags: ['defusion'],
		weight: 2,
		minimumTime: 38,
	},
	'sound-meditation': {
		id: 'sound-meditation',
		title: 'Sound Meditation',
		emoji: '🎤',
		steps: [
			{
				content:
					"In this exercise, we'll practise mindfulness using the sounds around you. \n\nFind a comfortable position and continue when you're ready.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For 10 seconds, focus on the most distant sound you can hear. Describe it as fully as possible. For example, is it low or high pitched, constant or intermittent?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Now, shift your attention to a sound that's a middle distance from you.\n\nFocus on this sound for 10 seconds, then describe it in as much detail as you can.\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Finally, listen to the sounds closest to you for 10 seconds.\n\nDescribe these sounds as vividly as you can.\n',
				continueAfter: { messages: 1 },
			},
			{
				content: 'How was that experience? Did you notice anything new or unexpected?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'When doing this exercise, it\'s common to notice sounds that we usually ignore.\n\nIs there anything in your life which you often ignore but would like to pay attention to? If so, write a short commitment like "I will pay more attention to..."\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['mindfulness'],
		weight: 3,
		minimumTime: 12,
	},
	'thought-stream': {
		id: 'thought-stream',
		title: 'Thought Reel',
		emoji: '📽️',
		steps: [
			{
				content:
					"This exercise is about seeing your thoughts as thoughts, rather than being lost in them.\n\nFor 1 minute and 30 seconds, we're going to imagine sitting in a cinema. When a thought pops into your head, visualise it on the big screen, either as words or an image.\n\nDon't try to think anything in particular, just let your thoughts come and go. If you get distracted, just gently come back to the cinema screen.\n\nStart the timer when you're ready.\n",
				timer: 90,
			},
			{
				content: 'What thoughts did you notice? Was there anything surprising?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"For each thought you shared, let's rewrite it in the form \"I'm noticing I'm having the thought that...\"\n\nThis helps us to understand that thoughts are just thoughts and don't represent absolute reality.\n",
			},
		],
		tags: ['defusion', 'mindfulness'],
		weight: 3,
		minimumTime: 94,
	},
	'time-machine': {
		id: 'time-machine',
		title: 'Time Machine',
		emoji: '🌀',
		steps: [
			{
				content:
					'Sometimes viewing our lives from different perspectives can help make our current situation more clear.\n\nImagine meeting your younger self from 10 years ago. What would they want to ask you about how life turned out?\n',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'What would you want to tell your younger self? What advice or reassurance would you share?\n',
				continueAfter: { messages: 1 },
			},
			{
				content: "What patterns or growth do you notice in how you've changed over the years?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Now let's travel forward in time. Imagine meeting your future self 10 years from now. What would you want to ask them?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Step into your future self's perspective. Looking back at your current self with compassion and understanding, what advice or reassurance would you give?\n",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Sometimes by zooming out our current situation becomes more clear. What insights or new understandings have emerged during this reflection?\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['defusion', 'thinking'],
		weight: 3,
		minimumTime: 12,
	},
	'values-compass': {
		id: 'values-compass',
		title: 'Birthday Speech',
		emoji: '🎂',
		steps: [
			{
				content:
					"Imagine you're at your own birthday celebration years from now. What would you want your closest friend to say about you in their speech? Take a moment to think about this.",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Looking at your answer, what does it reveal about what matters to you most? Try to identify 2-3 key values (e.g. creativity, kindness, honesty).',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Pick one of these values. What's one tiny action you could take tomorrow that would express this value?",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Making commitments dramatically increases our chances of actually doing things.\n\nLet\'s write a commitment in the form: "When I [am in this situation], I will [do this action]".\n',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['values'],
		weight: 3,
		minimumTime: 8,
	},
	'yes-or-no': {
		id: 'yes-or-no',
		title: 'Yes or No',
		emoji: '👍',
		steps: [
			{
				content:
					'In this exercise, we will explore how it feels to accept or reject life.\n\nFor 30 seconds, observe how it feels to take a "No" attitude to everything. You can do this with eyes open or closed.\n',
				timer: 30,
			},
			{
				content: 'How did that feel? Write down the emotions you felt.',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Now let\'s try the opposite. For 1 minute and 30 seconds, observe how it feels to take a "Yes" attitude to everything. You can do this with eyes open or closed.',
				timer: 90,
			},
			{
				content:
					'How did that feel, and how did it compare to the "No" experience? Write down the emotions you felt.',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['acceptance'],
		weight: 5,
		minimumTime: 124,
	},
};

const buddhistExercises: Record<string, Exercise> = {
	'impermanence-reflection': {
		id: 'impermanence-reflection',
		title: 'Impermanence Reflection',
		emoji: '⏳',
		steps: [
			{
				content:
					'Think of something in your life that you feel attached to. This could be a person, a place, or even an idea.\n\nWhat does this attachment mean to you?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Now, take a moment to reflect on the impermanence of this person or thing that you are attached to. How might it change or fade over time?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"For 1 minute, see how it feels to accept this impermanence. You don't have to like it, just calmly acknowledge and accept it.",
				timer: 60,
				continueAfter: { messages: 1 },
			},
			{
				content:
					'How did it feel to acknowledge this impermanence? Did it change how you view this person or thing?',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['buddhist', 'right-view', 'impermanence'],
		weight: 3,
		minimumTime: 8,
	},
	'non-self-reflection': {
		id: 'non-self-reflection',
		title: 'Non-Self Reflection',
		emoji: '🌊',
		steps: [
			{
				content:
					"In this exercise, we'll explore the Buddhist concept of non-self (anatta). Think about your sense of 'self' right now. If someone asked you 'who are you?', what would you say? List 5-6 aspects of your identity.",
				continueAfter: {
					messages: 5,
					prompt: 'The user has listed at least 5 aspects of their identity',
				},
			},
			{
				content:
					'Thank you for sharing these aspects of your identity. Now, for each one, consider: has this aspect always been exactly the same throughout your life? How has it changed over time?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Now, imagine yourself 10 years from now. Which of these aspects of your identity might change or evolve? How might your sense of 'self' be different?",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For 45 seconds, close your eyes and try to observe the changing nature of your thoughts and feelings as they arise. Notice how they appear and disappear, like waves on the ocean.',
				timer: 45,
			},
			{
				content:
					"After this observation, did you notice how thoughts and feelings come and go? If these elements of our experience are constantly changing, what does this suggest about having a fixed, permanent 'self'?",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"In Buddhist understanding, recognizing that there is no fixed, permanent self doesn't mean you don't exist. Rather, it suggests that what we call 'self' is a process - a flowing collection of experiences, perceptions, thoughts, and feelings that are constantly changing. How does this perspective feel to you?",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For the next 30 seconds, imagine your sense of self as a flowing river rather than a solid object. Everything is constantly changing and flowing, yet there is a continuity to the process.',
				timer: 30,
			},
			{
				content:
					"How might recognizing the fluid, changing nature of 'self' influence how you relate to challenging experiences or emotions?",
				continueAfter: { messages: 1 },
			},
		],
		tags: ['buddhist', 'right-view', 'non-self'],
		weight: 3,
		minimumTime: 82,
	},
	// TODO: This is shite
	'renunciation-reflection': {
		id: 'renunciation-reflection',
		title: 'Right Intention - Desirelessness',
		emoji: '🍃',
		steps: [
			{
				content:
					'Think of something that you crave or desire strongly. It could be an unhealthy desire like junk food, or a more positive desire like success or peace.',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'What emotions accompany this desire? For example, do you feel excitement, restlessness, or something else?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Now, reflect on what happens after you indulge this craving. Does the satisfaction last? Does it lead to further cravings? How does it affect your overall wellbeing?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For the next 45 seconds, imagine experiencing this craving but simply observing it without needing to act on it. Watch the sensation arise, exist, and possibly fade, just like watching clouds pass in the sky.',
				timer: 45,
			},
			{
				content: 'How did that feel? Does the craving feel useful or unhelpful to you?',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['buddhist', 'right-intention', 'desirelessness'],
		weight: 4,
		minimumTime: 85,
	},
	'harmlessness-practice': {
		id: 'harmlessness-practice',
		title: 'Harmlessness Practice',
		emoji: '🕊️',
		steps: [
			{
				content:
					'This brief exercise explores the Buddhist intention of harmlessness. Think of a recent interaction where you felt frustrated, annoyed, or angry with someone. Briefly describe what happened.',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'In that moment, what thoughts arose about the other person? Try to recall them as specifically as possible.',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Now consider: what might have been happening for that person? What stresses, misunderstandings, or difficulties might they have been experiencing?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"For the next 30 seconds, close your eyes and silently repeat this phrase, directing it toward the person from your interaction: 'May you be free from suffering. May you find peace.'",
				timer: 30,
			},
			{
				content:
					'Harmlessness begins in our intentions before it manifests in our actions. How might your interaction have been different if you had approached it with an intention of harmlessness from the beginning?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Would you be willing to writing a commitment to prioritise being harmless in your interactions? For example, "I will try not to cause suffering when interacting with others"',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['buddhist', 'right-intention', 'harmlessness'],
		weight: 3,
		minimumTime: 36,
	},
	'loving-kindness-practice': {
		id: 'loving-kindness-practice',
		title: 'Loving-Kindness Practice',
		emoji: '💗',
		steps: [
			{
				content:
					'This exercise explores the intention of goodwill or loving-kindness (mettā). Think of someone you find difficult to get along with or who challenges you in some way. Who comes to mind?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'When you think of this person, what physical sensations arise in your body? Where do you feel tension, constriction, or discomfort?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Now, take a step back and consider: what might this person wish for themselves? What happiness or peace might they be seeking, even if their methods seem unskillful?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"For the next 45 seconds, breathe deeply and silently repeat these phrases, directing them toward this person: 'May you be safe. May you be happy. May you be healthy. May you live with ease.'",
				timer: 45,
			},
			{
				content:
					"How did that feel? Was there resistance? Was there any softening? There's no right or wrong response - just notice what happened.",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'The Buddha taught that holding ill will is like picking up a hot coal to throw at someone else - we burn ourselves first. How has holding onto negative feelings toward this person affected your own wellbeing?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Developing goodwill doesn't mean approving of harmful actions or becoming passive. It means freeing your heart from the burden of ill will. What's one small way you could bring this intention of goodwill into your next interaction with this person or someone similar?",
				continueAfter: { messages: 1 },
			},
		],
		tags: ['buddhist', 'right-intention', 'goodwill', 'loving-kindness'],
		weight: 3,
		minimumTime: 52,
	},
	'truthful-speech-practice': {
		id: 'truthful-speech-practice',
		title: 'Truthful Speech Practice',
		emoji: '🔍',
		steps: [
			{
				content:
					'This exercise explores truthful speech. Reflect on a recent situation where you were tempted to bend the truth or did so. What was the situation?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'What motivated the urge to be untruthful? Was it fear, desire for approval, wanting to avoid conflict, or something else?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Notice any physical sensations or emotions that arise when recalling this situation. Where in your body do you feel them?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'In Buddhist practice, truthful speech requires both honesty and discernment. For the next 30 seconds, reflect on how you might have communicated truthfully while still being kind and timely.',
				timer: 30,
			},
			{
				content:
					'How might the outcome have been different if you had spoken with complete truthfulness? Consider both short-term and long-term effects.',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For the coming week, would you be willing to pause before speaking when you notice an urge to be untruthful? If so, what simple phrase might remind you of your commitment to truthful speech?',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['buddhist', 'right-speech', 'truthfulness'],
		weight: 3,
		minimumTime: 36,
	},
	'harmonious-speech-practice': {
		id: 'harmonious-speech-practice',
		title: 'Harmonious Speech Practice',
		emoji: '🤝',
		steps: [
			{
				content:
					'This exercise focuses on avoiding divisive speech. Think of a recent conversation where you said something that might have created division or damaged relationships. What was the situation?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'What was your motivation for sharing this information? Was it to be helpful, to feel included, to get attention, or something else?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Before speaking about others, the Buddha suggested asking three questions: Is it true? Is it beneficial? Is it timely? Looking back, how would your words have measured against these criteria?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For 30 seconds, reflect on how your words might have affected the people involved.',
				timer: 30,
			},
			{
				content:
					'Think of a way you could use your speech to promote harmony instead. How might you speak about others in a way that builds community rather than divides it?',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['buddhist', 'right-speech', 'harmony'],
		weight: 3,
		minimumTime: 35,
	},
	'gentle-speech-practice': {
		id: 'gentle-speech-practice',
		title: 'Gentle Speech Practice',
		emoji: '🍃',
		steps: [
			{
				content:
					'This exercise explores avoiding harsh speech. Recall a recent time when you spoke harshly to someone - perhaps with anger, sarcasm, or a cutting tone. What happened?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'What emotions were you feeling just before you spoke harshly? How did these emotions feel in your body?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'The Buddha compared speech to honey - sweet, healing, and pleasant to receive. What might you have said differently if you had approached the situation with gentle speech?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For 45 seconds, breathe deeply and imagine yourself responding to that same situation with patience and gentle words. Notice how this feels in your body.',
				timer: 45,
			},
			{
				content:
					"Harsh speech often comes from our own suffering. What need of yours wasn't being met in that moment? (For example: respect, understanding, space, etc.)",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Moving forward, what might help you recognize when you're about to speak harshly? Is there a physical sensation, thought pattern, or situation that could serve as an early warning sign?",
				continueAfter: { messages: 1 },
			},
			{
				content:
					"What simple phrase could remind you to pause and choose gentle speech when you're feeling triggered? For example: 'Words matter' or 'Speak with kindness.'",
				continueAfter: { messages: 1 },
			},
		],
		tags: ['buddhist', 'right-speech', 'gentleness'],
		weight: 3,
		minimumTime: 52,
	},
	'meaningful-speech-practice': {
		id: 'meaningful-speech-practice',
		title: 'Meaningful Speech Practice',
		emoji: '💎',
		steps: [
			{
				content:
					'This exercise explores meaningful speech versus idle chatter. For the next 30 seconds, reflect on how much of your daily conversation might be considered idle or purposeless talk.',
				timer: 30,
			},
			{
				content:
					'What types of conversations do you find yourself engaging in most frequently? Are they meaningful exchanges, social bonding, passing time, or something else?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"The Buddha didn't suggest never engaging in pleasant conversation, but rather being mindful of how we use our words. What benefits have you noticed from more meaningful conversations in your life?",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'Think of one person you regularly talk with. What topic of greater meaning or depth could you explore with them that might be enriching for you both?',
				continueAfter: { messages: 1 },
			},
			{
				content:
					"Meaningful speech isn't just about serious topics - it's about speaking with purpose and presence. What's one way you could bring more mindfulness to your everyday conversations?",
				continueAfter: { messages: 1 },
			},
			{
				content:
					'For the coming week, would you be willing to experiment with reducing idle speech by 10% and replacing it with either meaningful conversation or mindful silence? What might this look like in practice?',
				continueAfter: { messages: 1 },
			},
		],
		tags: ['buddhist', 'right-speech', 'meaningful-speech'],
		weight: 3,
		minimumTime: 36,
	},
};

export const exerciseCategories: Record<string, Exercise[]> = {};

export const exercises: Record<string, Exercise> =
	PUBLIC_SITE_ENV === 'dev' ? { ...actExercises, ...buddhistExercises } : { ...actExercises };

Object.values(exercises).forEach((exercise) => {
	exercise.tags.forEach((tag) => {
		if (!exerciseCategories[tag]) {
			exerciseCategories[tag] = [];
		}
		exerciseCategories[tag].push(exercise);
	});
});
Object.keys(exerciseCategories).forEach((tag) => {
	exerciseCategories[tag].sort((a, b) => b.weight - a.weight);
});
