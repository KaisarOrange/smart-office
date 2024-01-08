<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { initializeStores, Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import ModalComponentOne from '$lib/Modal/ModalSelect.svelte';
	import Toaste from './Toaste.svelte';
	initializeStores();
	import Navbar from './Navbar.svelte';
	import 'remixicon/fonts/remixicon.css';
	import ModalEditPost from '$lib/Modal/ModalEditPost.svelte';
	import Spinner from '$lib/Spinner/Spinner.svelte';
	import { page } from '$app/stores';
	import { userID, userName } from '$lib/Stores/editorOutput';
	import ModalSelectUser from '$lib/Modal/ModalSelectUser.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		modalComponentOne: { ref: ModalComponentOne },
		modalEditPost: { ref: ModalEditPost },
		modalInsertUser: { ref: ModalSelectUser }
	};

	export let data: any;

	let time: any;

	if (data) {
		$userID = data.currentUserID;
		$userName = data.currentUserName;
	}

	// onMount(() => {
	// 	const evtSrc = new EventSource(`${env.PUBLIC_SERVER_URL}/api/sse/${data.currentUserID}`);

	// 	evtSrc.onmessage = (event) => {
	// 		time = event.data;
	// 		console.log(event);
	// 		console.log(event.data);
	// 	};
	// });

	// async function handleGetTime() {
	// 	console.log('oke');
	// 	const res = await fetch(`${env.PUBLIC_SERVER_URL}/time`);
	// 	if (res.status !== 200) {
	// 		console.log('Could not connect to the server');
	// 	} else {
	// 		const respon = await res.json();
	// 		console.log(respon);
	// 	}
	// }
</script>

{#await data.stream.users}
	<Spinner />
{:then users}
	{#if $page.url.pathname != '/beranda/live'}
		<Navbar data={users.data} />
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

	<div class="bg-white"><slot /></div>
{/await}

<style>
	:root {
		background-color: white;
	}
</style>
