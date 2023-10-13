<script lang="ts">
	import { goto } from '$app/navigation';
	export let data: any;

	let clicked: boolean;
</script>

<svelte:window on:click={(e) => (clicked = false)} />

<div
	on:click|stopPropagation={() => {}}
	on:keydown
	aria-hidden
	class="flex justify-center items-center gap-2"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex flex-col">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="font-semibold select-none cursor-pointer flex items-center justify-center gap-2"
			on:click|stopPropagation={() => {
				clicked = !clicked;
				console.log(clicked);
			}}
		>
			<img class="w-12 h-12 object-cover rounded-full" src="/alif.png" alt="profile_picture" />
			<div class="">Ruang</div>
			<img src="/down.png" class="w-2 h-2" alt="" />
		</div>
		<div
			class="{clicked
				? 'clicked'
				: 'clickedHid '} bg-[#D9D9D9] absolute top-20 h-[250px] py-4 px-5 flex flex-col gap-3 rounded-sm overflow-scroll overflow-x-hidden"
		>
			<button class="bg-[#0093ED] btn text-white font-semibold px-2 py-1 rounded-md">Ruang +</button
			>
			<hr />
			{#each data.ruang as { ruang, img }}
				<div class="flex items-center gap-2">
					<img class="w-12 h-12 object-cover rounded-full" src={img} alt="profile_picture" />
					<div
						on:click={() => {
							goto(`/ruang/${ruang}`);
						}}
						class="font-semibold cursor-pointer"
					>
						{ruang}
					</div>
				</div>
			{/each}
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
