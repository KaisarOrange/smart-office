<script lang="ts">
	import TodoComponent from '$lib/Todo/TodoComponent.svelte';

	let nums = [0, 1, 2, 3, 4, 4, 4];
	export let data: any;
	console.log(data);
	const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
	const bulan = [
		'Januari',
		'Febuari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'November',
		'Desember'
	];
	let date = new Date();
	const day = date.getDay();
	console.log(day);

	const tanggal = date.getDate();
	const bulanDate = date.getMonth();
	const tahun = date.getFullYear();
</script>

<div class=" px-2.5 h-[550px] min-w-[250px] pt-2 rounded-sm bg-[#D9D9D9] right-5">
	<div class="flex px-1 justify-between items-center">
		<div>
			<p class="font-bold">Pengingat</p>
			<p class="font-thin">{hari[day]}, {tanggal} {bulan[bulanDate]} {tahun}</p>
		</div>

		<!-- <button class="btn bg-[#0093ED] text-white font-semibold rounded-md h-8 px-3">Tugas +</button> -->
	</div>

	<hr class="border-slate-700" />
	<div class="h-[450px] overflow-scroll p-2 overflow-x-hidden">
		{#each data as reminder}
			<TodoComponent {reminder} />
		{/each}
	</div>
</div>

<style>
</style>
