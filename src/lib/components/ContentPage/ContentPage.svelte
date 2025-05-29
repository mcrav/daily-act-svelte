<script lang="ts">
	const { children } = $props();
</script>

<main class="mx-auto px-5 pt-20 pb-16 sm:w-[768px]">{@render children?.()}</main>

<footer class="border-t border-t-neutral-500 p-8">
	<ul class="mb-5 flex justify-center gap-6">
		<a
			href="/privacy"
			target="_blank"><li>Privacy Policy</li></a
		>
		<a
			href="/terms"
			target="_blank"><li>Terms & Conditions</li></a
		>
	</ul>
	<p class="text-center text-neutral-500">© 2025 Daily ACT. All rights reserved.</p>
</footer>
