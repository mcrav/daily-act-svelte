<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';
	import * as m from '$lib/paraglide/messages.js';

	import '../app.css';
	import Header from '../lib/components/Header/Header.svelte';
	import { PUBLIC_DOMAIN } from '$env/static/public';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});

	let { children } = $props();
</script>

<svelte:head>
	<script
		defer
		data-domain={PUBLIC_DOMAIN}
		src="https://plausible.io/js/script.tagged-events.js"
	></script>
	<!-- Enable custom events to be sent with JS -->
	<script>
		window.plausible =
			window.plausible ||
			function () {
				(window.plausible.q = window.plausible.q || []).push(arguments);
			};
	</script>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<ParaglideJS {i18n}>
		<Header title={m.header()}></Header>
		{@render children?.()}
	</ParaglideJS>
</QueryClientProvider>
