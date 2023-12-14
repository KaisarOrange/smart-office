<script lang="ts">
	import Ruang from './Ruang.svelte';
	import Profil from './Profil.svelte';
	import { goto } from '$app/navigation';
	import { currentRuang } from '$lib/Stores/editorOutput';
	import { page } from '$app/stores';
	export let data: any;
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
			class=" {$page.url.pathname === '/beranda' ? 'text-[#0093ED] font-bold' : 'font-semibold'}"
			href="/beranda"
			>Beranda
			<div class="bg-blue-400 {$page.url.pathname === '/beranda' ? 'h-0.5' : ''}" /></a
		>
		<a
			on:click={() => {
				$currentRuang = 'Ruang';
			}}
			href="/beranda/profil"
			on:keydown={() => {}}
			aria-hidden
			class={$page.url.pathname === '/beranda/profil'
				? 'text-[#0093ED] font-bold'
				: 'font-semibold'}
		>
			Profil
			<div class="bg-blue-400 {$page.url.pathname === '/beranda/profil' ? 'h-0.5' : ''}" />
		</a>
		<a
			on:click={() => {
				$currentRuang = 'Ruang';
			}}
			class={$page.url.pathname === '/beranda/activity'
				? 'text-[#0093ED] font-bold'
				: 'font-semibold'}
			href="/beranda/activity"
			>Activity
			<div class="bg-blue-400 {$page.url.pathname === '/beranda/activity' ? 'h-0.5' : ''}" /></a
		>

		<button
			on:click={() => goto('/beranda/tulis')}
			class="btn text-white font-semibold bg-[#0093ED] px-2 py-0.5 rounded-md">Tulis +</button
		>
	</div>

	<div class="flex items-center gap-16">
		<Ruang data={data.ruang} />
		<Profil {data} />
	</div>

	<div class="flex justify-center items-center w-1/6">
		<label class="label">
			<img class="absolute top-[27px] right-[235px] w-6 h-auto" src="/search.svg" alt="" />
			<input class="rounded-sm px-8 py-1.5" type="text" placeholder="Search" />
		</label>
	</div>
</nav>
