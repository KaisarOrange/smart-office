<script lang="ts">
	import { goto } from '$app/navigation';
	import { getToastStore, ProgressRadial } from '@skeletonlabs/skeleton';
	const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
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
	const toastStore = getToastStore();
	const colors = ['green', 'orange', 'red'];
	let nums = [0, 1, 2, 3];
	let selected = 0;
	const bg = (color: any) => {
		return 'btn' + color;
	};
	export let reminder: any;
	console.log(reminder);

	let date: any = new Date(reminder?.due_time);
	let currentDate: any = new Date();
	let leftTime = date - currentDate;
	let timeLeft = new Date(leftTime);
	let day = date.getDate();
	let tanggal = date.getDay() - 1;
	let month = date.getMonth();
	let year = date.getFullYear();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const minutes = minute < 10 ? '0' + minute : minute;

	const percentage =
		reminder.completed_task === 0 ? 0 : (reminder.completed_task / reminder.total_task) * 100;
	let value: number = percentage; // %
</script>

<!-- <AppShell>...</AppShell> -->
<div class=" bg-white p-2 my-3 rounded-lg">
	<div class="flex justify-between mb-1">
		<div>
			<p
				on:click={() => {
					goto(`/beranda/ruang/${reminder.ruang_id}/${reminder.post_id}`);
				}}
				on:keydown={() => {}}
				aria-hidden
				class="font-bold text-sm hover:text-blue_office cursor-pointer select-none active:text-blue-600"
			>
				{reminder.title}
			</p>
			<p class="font-thin">{hari[tanggal]}, {day} {bulan[month]} {year}</p>
		</div>

		<div class="m-1">
			<ProgressRadial
				stroke={50}
				font={150}
				width={'w-12'}
				meter="stroke-primary-500"
				track="stroke-primary-500/30"
				{value}>{percentage}%</ProgressRadial
			>
		</div>
	</div>
	<hr class="border-slate-700" />

	<div class="flex justify-between font-thin m-1">
		<p>
			{timeLeft.getMonth() > 0 ? timeLeft.getMonth() + ' bulan' : timeLeft.getDate() + ' hari'} , {hour}:{minutes}
		</p>

		<!-- User pictures -->
		<!-- 
		<div class="flex">
			{#each nums as num}
				<div class="m-0">
					<img class="w-6 h-6 object-cover rounded-full" src="/alif.png" alt="profile_picture" />
				</div>{/each}
		</div> -->
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
