<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Toast, initializeStores, Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import ModalComponentOne from '$lib/Modal/ModalSelect.svelte';
	import Toaste from './Toaste.svelte';
	initializeStores();
	import Navbar from './Navbar.svelte';
	import 'remixicon/fonts/remixicon.css';
	import ModalEditPost from '$lib/Modal/ModalEditPost.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		modalComponentOne: { ref: ModalComponentOne },
		modalEditPost: { ref: ModalEditPost }

		// ...
	};
	let modalStore: any = getModalStore();

	export let data: any;

	const set = () => {
		$modalStore[0]?.response(false);
	};
</script>

{#if data.url != '/tulis' && data.url != '/edit'}
	<Navbar bind:data />
{/if}
<Modal
	buttonPositive="bg-blue_office text-white font-semibold"
	buttonNeutral={'bg-surface-400'}
	components={modalRegistry}
	on:backdrop={(event) => {
		console.log(event);
	}}
/>
<Toaste />

<div class="mt-24 bg-white"><slot /></div>

<style>
	:root {
		background-color: white;
	}
</style>
