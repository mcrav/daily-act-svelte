<script lang="ts">
	import ContentPage from '$lib/components/ContentPage/ContentPage.svelte';
	import ContentPageHeading from '$lib/components/ContentPageHeading/ContentPageHeading.svelte';
</script>

<svelte:head>
	<title>Daily ACT: Privacy Policy</title>
</svelte:head>

<ContentPage>
	<ContentPageHeading>Privacy Policy</ContentPageHeading>

	<p class="text-xl">for Daily ACT</p>
	<p class="mt-2 mb-8 text-sm">Last Updated: April 14, 2025</p>
	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">Introduction</h2>
		<p class="mb-4">
			Welcome to Daily ACT ("we," "our," or "us"). We are committed to protecting your privacy and
			ensuring you have a positive experience while using our daily emotional wellness app.
		</p>
		<p>
			This Privacy Policy explains how we collect, use, and safeguard your information when you use
			Daily ACT. By using our app, you agree to the collection and use of information in accordance
			with this policy.
		</p>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">Information We Collect</h2>

		<div class="mb-6">
			<h3 class="mb-2 text-xl font-medium">Information Stored Locally</h3>
			<p class="mb-3">
				Daily ACT is designed with your privacy in mind. All user data is stored locally on your
				device using browser localStorage, including:
			</p>
			<ul class="mb-3 list-disc space-y-1 pl-6">
				<li>Onboarding status</li>
			</ul>
			<p class="font-medium">
				We send your chat messages to OpenAI's API for processing, but we do not store these
				messages.
			</p>
		</div>

		<div class="mb-6">
			<h3 class="mb-2 text-xl font-medium">Analytics Information</h3>
			<p class="mb-3">We use Plausible Analytics, a privacy-friendly analytics service that:</p>
			<ul class="mb-3 list-disc space-y-1 pl-6">
				<li>Does not use cookies</li>
				<li>Does not collect personal data</li>
				<li>Does not track users across devices or websites</li>
				<li>Complies with privacy regulations without requiring consent banners</li>
			</ul>
			<p class="mb-3">Plausible collects anonymous usage statistics including:</p>
			<ul class="mb-3 list-disc space-y-1 pl-6">
				<li>Page views</li>
				<li>Referral sources</li>
				<li>Browser and device types</li>
				<li>Approximate geographic location (country level only)</li>
				<li>User engagement metrics</li>
			</ul>
			<p>This data is aggregated and cannot be used to identify you personally.</p>
		</div>

		<div>
			<h3 class="mb-2 text-xl font-medium">Error Monitoring</h3>
			<p class="mb-3">
				We use Sentry for error monitoring to improve app stability. This service may collect:
			</p>
			<ul class="mb-3 list-disc space-y-1 pl-6">
				<li>Technical information about crashes and errors</li>
				<li>Device information necessary for troubleshooting</li>
				<li>App state information at the time of an error</li>
			</ul>
			<p>
				Sentry's data collection is limited to technical information required to fix issues and does
				not include your personal exercise responses.
			</p>
		</div>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">How We Use Information</h2>
		<p class="mb-3">We use the collected information for the following purposes:</p>
		<ul class="space-y-2">
			<li class="flex">
				<span class="mr-2 font-semibold">•</span>
				<span
					><span class="font-medium">To provide and maintain our service:</span> Your locally stored
					data enables the app to function properly and maintain your progress.</span
				>
			</li>
			<li class="flex">
				<span class="mr-2 font-semibold">•</span>
				<span
					><span class="font-medium">To improve our service:</span> Anonymous analytics and error data
					help us understand how users interact with Daily ACT and identify areas for improvement.</span
				>
			</li>
			<li class="flex">
				<span class="mr-2 font-semibold">•</span>
				<span
					><span class="font-medium">To fix technical issues:</span> Error monitoring helps us identify
					and resolve bugs quickly.</span
				>
			</li>
		</ul>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">Data Retention</h2>
		<ul class="space-y-4">
			<li class="flex">
				<span class="mr-2 font-semibold">•</span>
				<div>
					<span class="font-medium">Local storage data:</span> Your locally stored data remains on
					your device until:
					<ul class="mt-2 list-disc space-y-1 pl-8">
						<li>You clear your browser data</li>
					</ul>
				</div>
			</li>
			<li class="flex">
				<span class="mr-2 font-semibold">•</span>
				<span
					><span class="font-medium">Analytics data:</span> Anonymous analytics data is retained for
					24 months by Plausible Analytics.</span
				>
			</li>
			<li class="flex">
				<span class="mr-2 font-semibold">•</span>
				<span
					><span class="font-medium">Error monitoring data:</span> Sentry retains error data for 90 days.</span
				>
			</li>
		</ul>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">Data Sharing</h2>
		<p class="mb-4">
			We do not sell, trade, or rent your personal information to third parties. We may share
			anonymous, aggregated data with:
		</p>
		<ul class="list-disc space-y-1 pl-6">
			<li>
				Service providers who assist us in operating our services (Plausible Analytics and Sentry)
			</li>
			<li>Law enforcement agencies when required by law</li>
		</ul>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">Your Rights</h2>
		<p class="mb-3">You have the right to:</p>
		<ul class="list-disc space-y-1 pl-6">
			<li>Access your locally stored data (through your browser's developer tools)</li>
			<li>Delete your locally stored data (by clearing your browser data)</li>
		</ul>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">Children's Privacy</h2>
		<p>
			Daily ACT is not intended for children under 13 years of age. We do not knowingly collect
			personal information from children under 13.
		</p>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">Changes to This Privacy Policy</h2>
		<p>
			We may update our Privacy Policy from time to time. We will notify you of any changes by
			posting the new Privacy Policy on this page and updating the "Last Updated" date.
		</p>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">Contact Us</h2>
		<p>
			If you have any questions about this Privacy Policy, please contact us at:
			<span class="mt-2 block font-medium"
				>Reddit: <a
					href="https://www.reddit.com/user/tigrinekrevete/"
					target="_blank">u/tigrinekrevete</a
				></span
			>
		</p>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">California Privacy Rights</h2>
		<p>
			If you are a California resident, you may have additional rights under the California Consumer
			Privacy Act (CCPA). However, as Daily ACT does not collect personal information on servers and
			only uses anonymous analytics, many CCPA provisions may not apply.
		</p>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">International Data Transfers</h2>
		<p>
			As all user-specific data is stored locally on your device, and only anonymous analytics data
			is processed, there are minimal international data transfer concerns. Plausible Analytics and
			Sentry may process anonymous data in accordance with their respective privacy policies and
			applicable data protection laws.
		</p>
	</section>

	<section class="mt-5 rounded-lg border border-gray-100 p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-semibold">Security Measures</h2>
		<p class="mb-4">
			We implement appropriate technical and organizational measures to protect your locally stored
			data, including:
		</p>
		<ul class="mb-4 list-disc space-y-1 pl-6">
			<li>Developing our app following security best practices</li>
			<li>Regular security updates and maintenance</li>
			<li>Using reputable service providers for analytics and error monitoring</li>
		</ul>
		<p>
			However, please be aware that no method of electronic storage is 100% secure, and we cannot
			guarantee absolute security.
		</p>
	</section>
</ContentPage>
