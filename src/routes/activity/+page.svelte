<script lang>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import DayGrid from '@event-calendar/day-grid';

	let days = [];
	for (let i = 0; i < 7; ++i) {
		let day = new Date();
		let diff = i - day.getDay();
		day.setDate(day.getDate() + diff);
		days[i] = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
	}
	let plugins = [TimeGrid, DayGrid];
	let options = {
		view: 'dayGridMonth',
		events: [
			{ start: days[0] + ' 00:00', end: days[0] + ' 09:00', resourceId: 1, display: 'background' },
			{ start: days[1] + ' 12:00', end: days[1] + ' 14:00', resourceId: 2, display: 'background' },
			{ start: days[2] + ' 17:00', end: days[2] + ' 24:00', resourceId: 1, display: 'background' },
			{
				start: days[0] + ' 10:00',
				end: days[0] + ' 14:00',
				resourceId: 1,
				title: 'Buat todolist',
				color: '#FE6B64'
			},
			{
				start: days[1] + ' 16:00',
				end: days[2] + ' 08:00',
				resourceId: 2,
				title: 'Rapat desain',
				color: '#B29DD9'
			},
			{
				start: days[2] + ' 09:00',
				end: days[2] + ' 13:00',
				resourceId: 2,
				title: 'pengembangan fitur A',
				color: '#779ECB'
			},
			{
				start: days[3] + ' 15:00',
				end: days[3] + ' 18:00',
				resourceId: 1,
				title: 'Fitur B',
				color: '#779ECB'
			},
			{
				start: days[5] + ' 10:00',
				end: days[5] + ' 16:00',
				resourceId: 2,
				title: { html: 'Fitur C' },
				color: '#779ECB'
			},
			{
				start: days[5] + ' 14:00',
				end: days[5] + ' 19:00',
				resourceId: 2,
				title: 'Rapat',
				color: '#FE6B64'
			},
			{
				start: days[5] + ' 18:00',
				end: days[5] + ' 21:00',
				resourceId: 2,
				title: '',
				color: '#B29DD9'
			},
			{
				start: days[1],
				end: days[3],
				resourceId: 1,
				title: 'Implementasi fitur',
				color: '#B29DD9',
				allDay: true
			}
		]
	};
</script>

<div class="w-3/4 m-auto">
	<Calendar {plugins} {options} />
</div>
