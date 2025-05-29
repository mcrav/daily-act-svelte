<script lang="ts">
	interface Props {
		question: string;
		answer: string;
	}
	const { question, answer }: Props = $props();
</script>

<div class="flex flex-col gap-2">
	<h2 class="font-semibold text-[#374e6a] dark:text-[#a3c1e5]">{question}</h2>
	<!-- eslint-disable-next-line svelte/no-at-html-tags - can trust i18n -->
	<p class="">{@html answer}</p>
</div>
