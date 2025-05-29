<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let formattedHours = '';
	let formattedMinutes = '';
	let formattedSeconds = '';
	let intervalId: number;

	function calculateTimeUntilMidnight() {
		const now = new Date();
		const midnight = new Date();

		// Set time to next midnight
		midnight.setHours(24, 0, 0, 0);

		// Calculate time difference in milliseconds
		const diff = midnight.getTime() - now.getTime();

		// Convert to hours, minutes, seconds
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);

		// Format with leading zeros
		formattedHours = hours.toString().padStart(2, '0');
		formattedMinutes = minutes.toString().padStart(2, '0');
		formattedSeconds = seconds.toString().padStart(2, '0');
	}

	onMount(() => {
		// Calculate immediately
		calculateTimeUntilMidnight();

		// Set up interval to update every second
		intervalId = window.setInterval(calculateTimeUntilMidnight, 1000);
	});

	onDestroy(() => {
		// Clean up interval when component is destroyed
		if (intervalId) clearInterval(intervalId);
	});
</script>

<p>Exercises update in:</p>
<!-- TODO: Fade this in -->
<p class="mt-2 font-mono text-lg font-semibold">
	{`${formattedHours}:${formattedMinutes}:${formattedSeconds}`}
</p>
