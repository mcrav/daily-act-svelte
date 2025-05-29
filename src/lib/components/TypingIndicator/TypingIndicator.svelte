<div class="typing-indicator">
	{#each { length: 3 }}
		<span class="bg-[#5b7493] dark:bg-[#87aede]"></span>
	{/each}
</div>

<style>
	.typing-indicator {
		display: flex;
		gap: 5px;
		animation: fadeOut 0s ease-in forwards;
		animation-delay: 2s;
	}

	.typing-indicator span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		animation: typing 1.5s infinite ease-in-out;
	}

	.typing-indicator span:nth-child(1) {
		animation-delay: 0s;
	}
	.typing-indicator span:nth-child(2) {
		animation-delay: 0.2s;
	}
	.typing-indicator span:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes typing {
		0%,
		80%,
		100% {
			transform: translateY(0);
			opacity: 0.3;
		}
		40% {
			transform: translateY(-5px);
			opacity: 1;
		}
	}
</style>
