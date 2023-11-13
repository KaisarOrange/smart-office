<script lang="ts">
	import '../app.postcss';
	import Ruang from './Ruang.svelte';
	import Profil from './Profil.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { currentRuang } from '$lib/Stores/editorOutput';
	export let data: any;
	console.log(data, 'hehehe');
</script>

<nav class="bg-[#D9D9D9] flex justify-between p-3 items-center fixed top-0 w-full z-10">
	<div
		on:click={() => {
			$currentRuang = 'Ruang';
		}}
		on:keydown={() => {}}
		aria-hidden
	>
		<a class="font-extrabold text-lg" href="/"><span class="text-[#0093ED]">SMART</span> OFFICE</a>
	</div>
	<div class="flex justify-around items-center gap-12">
		<a
			on:click={() => {
				$currentRuang = 'Ruang';
			}}
			class=" {data.url === '/' ? 'text-[#0093ED] font-bold' : 'font-semibold'}"
			href="/"
			>Beranda
			<div class="bg-blue-400 {data.url === '/' ? 'h-0.5' : ''}" /></a
		>
		<a
			on:click={() => {
				$currentRuang = 'Ruang';
			}}
			class={data.url === '/profil' ? 'text-[#0093ED] font-bold' : 'font-semibold'}
			href="/profil"
			>Profil
			<div class="bg-blue-400 {data.url === '/profil' ? 'h-0.5' : ''}" /></a
		>
		<a
			on:click={() => {
				$currentRuang = 'Ruang';
			}}
			class={data.url === '/activity' ? 'text-[#0093ED] font-bold' : 'font-semibold'}
			href="/activity"
			>Activity
			<div class="bg-blue-400 {data.url === '/activity' ? 'h-0.5' : ''}" /></a
		>
		<!-- <a class={data.url === '/' ? 'text-[#0093ED] font-bold' : 'font-semibold'} href="/"
			>Stream <div class="bg-blue-400 {data.url === '/' ? 'h-0.5' : ''}" /></a
		> -->

		<button
			on:click={() => goto('/tulis')}
			class="btn text-white font-semibold bg-[#0093ED] px-2 py-0.5 rounded-md">Tulis +</button
		>
	</div>

	<div class="flex items-center gap-16">
		<Ruang data={data.user.data.ruang} />
		<Profil data={data.user.data} />
	</div>

	<div class="flex justify-center items-center w-1/6">
		<label class="label">
			<img class="absolute top-[27px] right-[235px] w-6 h-auto" src="/search.svg" alt="" />
			<input class="rounded-sm px-8 py-1.5" type="text" placeholder="Search" />
		</label>
	</div>
</nav>
