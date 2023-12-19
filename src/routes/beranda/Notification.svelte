<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Like from '$lib/Notification/Like.svelte';
	import { onMount } from 'svelte';
	import { userID } from '$lib/Stores/editorOutput';
	import { notifications } from '$lib/notification';
	import Invite from '$lib/Notification/Invite.svelte';

	let clicked: boolean;
	let num: Number[] = [0, 1, 2, 3];

	let notifs: any;

	let notifCount = 0;

	onMount(() => {
		setInterval(async () => {
			const fet = await fetch(`${env.PUBLIC_SERVER_URL}/api/user/notif/${$userID}`);
			notifs = await fet.json();
		}, 1000);
	});
</script>

<svelte:window on:click={(e) => (clicked = false)} />
<div
	style="background-image: url(/bell.svg);"
	class="relative block w-7 h-7 bg-contain select-none cursor-pointer"
	on:click|stopPropagation={() => {
		clicked = !clicked;
		console.log(clicked);
	}}
	on:keydown={() => {
		clicked = !clicked;
		console.log(clicked);
	}}
	aria-hidden
>
	<span class="absolute text-xs text-white font-bold bottom-3 left-3 bg-[#0093ED] rounded-full px-1"
		>{notifs?.data.length}</span
	>
</div>

<div
	on:click|stopPropagation={() => {}}
	on:keydown={() => {}}
	aria-hidden
	class="flex justify-center items-center gap-2"
>
	<div
		class="{clicked
			? 'clicked'
			: 'clickedHid'} divide-slate-200 bg-[#D9D9D9] absolute top-20 p-2 flex flex-col h-72 gap-3 rounded-sm w-1/4"
	>
		<p class="font-semibold mx-2">Notifikasi</p>
		<hr class="" />
		<div class="overflow-scroll overflow-x-hidden h-full">
			{#if notifs}
				{#each notifs.data as { message, type }}
					{#if type === 'like'}
						<Like {message} />
						<Invite {message} />
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.clicked {
		visibility: visible;
	}
	.clickedHid {
		visibility: hidden;
	}
</style>
