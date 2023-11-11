<script lang="ts">
	import { goto } from '$app/navigation';
	import { Avatar } from '@skeletonlabs/skeleton';
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
	<div class="flex flex-col">
		<div
			class="font-semibold select-none cursor-pointer flex items-center justify-center gap-2"
			on:click|stopPropagation={() => {
				clicked = !clicked;
				console.log(clicked);
			}}
			on:keydown={() => {}}
			aria-hidden
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
			<button
				class="bg-[#0093ED] hover:bg-[#51abef] active:bg-[#3d88b6] text-white font-semibold px-2 py-1 rounded-md"
				>Ruang +</button
			>
			{#each data as { name, id }}
				<div
					on:keydown={() => {}}
					aria-hidden
					on:click={() => {
						goto(`/ruang/${id}`);
					}}
					class="flex cursor-pointer items-center gap-2 hover:bg-gray-100 bg-white px-1.5 rounded-md py-1"
				>
					<Avatar width="w-11" />
					<div class="font-semibold cursor-pointer">
						{name}
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
