<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { ruangAddUser } from '$lib/functions/ruangAddUser';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';

	const names = ['joan', 'alif', 'bobby', 'dwi'];
	let input = '';
	export let parent: SvelteComponent;
	const modalStore = getModalStore();
</script>

<div class="bg-white p-4 w-1/4">
	<div class="text-lg font-bold text-blue_office">Undang pengguna</div>
	<div class="mt-4 flex gap-2">
		<input class="input bg-white" type="text" placeholder="nama pengguna" bind:value={input} />
		<button
			on:click={() => {
				ruangAddUser(input, $modalStore[0].meta.ruang);
				invalidateAll();
				parent.onClose();
			}}
			class="bg-blue_office text-white font-semibold px-1 rounded-sm">Undang</button
		>
	</div>

	{#if input != ''}
		<div class="bg-blue_office mt-2 px-1 py-0.5 w-fit text-white font-semibold">
			@{names.filter((item) => item.toLowerCase().startsWith(input.toLowerCase())).slice(0, 5)}
		</div>
	{/if}
</div>
