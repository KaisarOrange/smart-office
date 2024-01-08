<script lang>
	import Calender from './Calender.svelte';
	export let data;
</script>

<div class="mt-24 w-3/4 m-auto">
	{#await data?.stream?.users}
		<div>hello</div>
	{:then user}
		<Calender data={user} />
	{/await}
</div>
