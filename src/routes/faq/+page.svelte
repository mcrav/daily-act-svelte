<script lang="ts">
	import ContentPage from '$lib/components/ContentPage/ContentPage.svelte';
	import ContentPageHeading from '$lib/components/ContentPageHeading/ContentPageHeading.svelte';
	import FaqItem from '$lib/components/FAQItem/FAQItem.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>{m.faq_title()}</title>
	<meta
		name="description"
		content="Daily ACT Frequently asked questions (FAQ): Common questions about building emotional strength through Daily ACT's daily acceptance, mindfulness and values exercises."
	/>
</svelte:head>

<ContentPage>
	<ContentPageHeading>Frequently asked questions (FAQ)</ContentPageHeading>
	<div class="flex flex-col gap-8">
		<FaqItem
			question={m.faq_target_audience_question()}
			answer={m.faq_target_audience_answer()}
		/>
		<FaqItem
			question={m.faq_privacy_question()}
			answer={m.faq_privacy_answer()}
		/>
		<FaqItem
			question="Is the chat powered by AI?"
			answer="No. The chat simply reads out a predefined script. This ensures 100% privacy, as your messages are not sent to an AI model."
		/>
		<FaqItem
			question={m.faq_reset_time_question()}
			answer={m.faq_reset_time_answer()}
		/>
		<FaqItem
			question={m.faq_previous_days_question()}
			answer={m.faq_previous_days_answer()}
		/>
		<FaqItem
			question={m.faq_is_it_free_question()}
			answer={m.faq_is_it_free_answer()}
		/>
	</div>
</ContentPage>
