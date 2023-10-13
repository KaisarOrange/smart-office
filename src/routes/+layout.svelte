<script lang="ts">
	import { Toast, initializeStores } from '@skeletonlabs/skeleton';
	export let data: any;
	initializeStores();
	import '../app.postcss';
	import Ruang from './Ruang.svelte';
	import Profil from './Profil.svelte';
	import Toaste from './Toaste.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
</script>

<nav class="bg-[#D9D9D9] flex justify-between p-3 items-center fixed top-0 w-full">
	<div>
		<a class="font-extrabold text-lg" href="/"><span class="text-[#0093ED]">SMART</span> OFFICE</a>
	</div>
	<div class="flex justify-around items-center gap-12">
		<a class="font-semibold" href="/">Stream</a>
		<a class="font-semibold" href="/profil">Profil</a>
		<a class="font-semibold" href="/about">Stream</a>
		<a class="font-semibold" href="/about">Stream</a>

		<button
			on:click={() => goto('/tulis')}
			class="btn text-white font-semibold bg-[#0093ED] px-2 py-0.5 rounded-md">Tulis +</button
		>
	</div>

	<div class="flex items-center gap-16">
		<Ruang {data} />
		<Profil />
	</div>

	<div class="flex justify-center items-center w-1/6">
		<label class="label">
			<input class="input rounded-sm p-1" type="text" placeholder="Input" />
		</label>
	</div>
</nav>
<Toaste />
<div class="mt-24 bg-white"><slot /></div>

<style>
	:root {
		background-color: white;
	}
</style>
