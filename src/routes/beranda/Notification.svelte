<script lang="ts">
	let clicked: boolean;
	let num: Number[] = [0, 1, 2, 3];
</script>

<svelte:window on:click={(e) => (clicked = false)} />

<div
	style="background-image: url(/bell.svg);"
	class="relative block w-7 h-7 bg-contain select-none cursor-pointer"
	on:click|stopPropagation={() => {
		clicked = !clicked;
		console.log(clicked);
	}}
	on:keydown={() => {
		clicked = !clicked;
		console.log(clicked);
	}}
	aria-hidden
>
	<span class="absolute text-xs text-white font-bold bottom-3 left-3 bg-[#0093ED] rounded-full px-1"
		>2</span
	>
</div>

<div
	on:click|stopPropagation={() => {}}
	on:keydown={() => {}}
	aria-hidden
	class="flex justify-center items-center gap-2"
>
	<div
		class="{clicked
			? 'clicked'
			: 'clickedHid'} divide-slate-200 bg-[#D9D9D9] absolute top-20 p-2 flex flex-col h-72 gap-3 rounded-sm w-1/4"
	>
		<p class="font-semibold mx-2">Notifikasi</p>
		<hr class="" />
		<div class="overflow-scroll overflow-x-hidden">
			{#each num as numb}
				<div class="flex gap-2 rounded-md bg-white p-2 mx-2 mb-2">
					<img class="w-8 h-8 object-cover rounded-full" src="/alif.png" alt="profile_picture" />
					<div class="text-sm">
						<p class="font-semibold">
							Ruang . <span class="font-normal">4h</span>
						</p>
						<div class="">Lorem, ipsum dolor sit amet consectetur adipisicing elit</div>
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
