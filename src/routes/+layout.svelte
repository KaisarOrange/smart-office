<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { Toast, initializeStores, Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import ModalComponentOne from '$lib/Modal/ModalSelect.svelte';
	import Toaste from './Toaste.svelte';
	initializeStores();
	import Navbar from './Navbar.svelte';
	import 'remixicon/fonts/remixicon.css';

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		modalComponentOne: { ref: ModalComponentOne }
		// ...
	};

	export let data: any;
</script>

{#if data.url != '/tulis'}
	<Navbar {data} />
{/if}
<Modal
	buttonPositive="bg-blue_office"
	buttonNeutral={'bg-surface-400'}
	components={modalRegistry}
/>
<Toaste />
<div class="mt-24 bg-white"><slot /></div>

<style>
	:root {
		background-color: white;
	}
</style>
