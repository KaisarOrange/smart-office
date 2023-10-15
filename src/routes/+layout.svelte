<script lang="ts">
	export let data: any;
	import { Toast, initializeStores } from '@skeletonlabs/skeleton';
	import Toaste from './Toaste.svelte';
	initializeStores();
	import Navbar from './Navbar.svelte';
</script>

{#if data.url != '/tulis'}
	<Navbar {data} />
{/if}
<Toaste />
<div class="mt-24 bg-white"><slot /></div>

<style>
	:root {
		background-color: white;
	}
</style>
