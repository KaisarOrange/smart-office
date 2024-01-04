<script>
	import { goto } from '$app/navigation';
</script>

<div
	class="fixed left-0 right-0 bottom-3 w-1/4 py-2 bg-blue_office flex justify-center gap-4 items-center m-auto rounded-sm"
>
	<div class="mute px-3 py-2 rounded-full">
		<i class="ri-camera-fill" />
	</div>

	<div class="mute px-3 py-2 rounded-full">
		<i class="ri-volume-mute-fill" />
	</div>

	<div
		class="reject px-3 py-2 rounded-full cursor-pointer"
		on:click={() => {}}
		on:keydown={() => {}}
		aria-hidden
	>
		<a href="/beranda" data-sveltekit-reload><i class="ri-phone-fill" /></a>
	</div>
</div>

<style>
	.reject {
		background-color: rgb(255, 39, 39);
	}

	.mute {
		background-color: white;
	}
</style>
