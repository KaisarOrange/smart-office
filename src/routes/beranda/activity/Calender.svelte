<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import DayGrid from '@event-calendar/day-grid';
	import { onMount } from 'svelte';
	export let data: any;
	let colors = [
		'#d13728',
		'#ee923c',
		'#436b88',
		'#0e641c',
		'#da5e82',
		'#9b49b4',
		'#5b5b5b',
		'#432a12'
	];
	let events: any = [];
	let plugins = [TimeGrid, DayGrid];
	let i = 0;
	data.data.reminders.forEach((e: any) => {
		const startDate = new Date(e.CreatedAt);
		const endDate = new Date(e.due_time);
		const time = endDate.getHours().toLocaleString() + ':' + endDate.getMinutes().toLocaleString();
		const start =
			startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
		const end = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();
		events = [
			...events,
			{
				start: `${end} + " ${time}"`,
				end: `${end}  + " ${time}"`,
				resourceId: 1,
				title: e.title,
				color: colors[Math.floor(Math.random() * 7)]
			}
		];
		i++;
	});

	let options = { view: 'dayGridMonth', events: events };
</script>

<div><Calendar {plugins} {options} /></div>
