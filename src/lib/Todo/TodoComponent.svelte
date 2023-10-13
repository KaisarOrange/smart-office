<script lang="ts">
	import { getToastStore, ProgressRadial } from '@skeletonlabs/skeleton';

	let value: number = 50; // %
	const toastStore = getToastStore();
	const colors = ['green', 'orange', 'red'];
	let nums = [0, 1, 2, 3];
	let selected = 0;
	const bg = (color: any) => {
		return 'btn' + color;
	};
</script>

<!-- <AppShell>...</AppShell> -->
<div class=" bg-white p-2 my-3 rounded-lg">
	<div class="flex justify-around mb-1">
		<div>
			<p class="font-bold text-sm">Membuat rancangan kerja</p>
			<p class="font-thin">Sabtu, 14 Agustus</p>
		</div>

		<div class="m-1">
			<ProgressRadial
				stroke={50}
				font={150}
				width={'w-12'}
				meter="stroke-primary-500"
				track="stroke-primary-500/30"
				{value}>{value}%</ProgressRadial
			>
		</div>
	</div>
	<hr class="border-slate-700" />

	<div class="flex justify-between font-thin m-1">
		<p>Hari ini, 14:00</p>

		<div class="flex">
			{#each nums as num}
				<div class="m-0">
					<img class="w-6 h-6 object-cover rounded-full" src="/alif.png" alt="profile_picture" />
				</div>{/each}
		</div>
	</div>
</div>

<!-- Button 3 color todo status -->
<!-- {#each colors as color, i}
        <button
          class="btn {selected === i
            ? bg(color)
            : 'bg-white'}  rounded-full w-3.5 h-3.5 m-1 border-[1px] border-slate-600"
          aria-label={color}
          on:click={() => {
            selected = i;
            toast(`status tugas : ${color}`);
          }}
        ></button>
      {/each} -->
