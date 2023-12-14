<script>
	import { goto } from '$app/navigation';

	// @ts-nocheck

	import '../app.postcss';
</script>

<div class="bg-white">
	<nav class=" flex justify-between py-4 px-8 items-center fixed top-0 w-full z-10">
		<div on:click={() => {}} on:keydown={() => {}} aria-hidden>
			<a class="font-extrabold text-lg" href="/"><span class="text-[#0093ED]">SMART</span> OFFICE</a
			>
		</div>
		<div class="flex justify-around items-center gap-12 font-semibold">
			<a on:click={() => {}} href="/">Beranda</a>
			<a on:click={() => {}} href="/profil" on:keydown={() => {}} aria-hidden> Profil </a>
			<a on:click={() => {}} href="/activity">Activity </a>
		</div>
		<div>
			<button
				on:click={() => goto('/daftar')}
				class="btn bg-blue_office text-white rounded-md font-semibold px-5 py-1">Daftar</button
			>
			<button
				on:click={() => goto('/login')}
				class="btn bg-whites variant-outline-primary rounded-md text-blue_office font-semibold px-5 py-1"
				>Login</button
			>
		</div>
	</nav>

	<div class="flex justify-center items-center mt-24">
		<div class="flex flex-col items-center">
			<h1 class="text-3xl">Kolaborasi Tanpa Batas, Komunikasi Tanpa Hambatan</h1>
			<p class="mt-2">Solusi bisnis untuk mengoptimalkan produktivitas dan kerjasama tim.</p>
			<div class="flex gap-4">
				<button
					on:click={() => goto('/daftar')}
					class="btn bg-blue_office text-white rounded-md mt-5 font-semibold">Mulai</button
				>
				<button
					class="btn bg-whites variant-outline-primary rounded-md mt-5 text-blue_office font-semibold"
					>Hubungi kami</button
				>
			</div>
		</div>
	</div>
</div>

<style>
</style>
