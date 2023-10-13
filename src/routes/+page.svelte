<script>
	import '../app.postcss';
	export let data;
	import Posts from '$lib/Posts/Posts.svelte';
</script>

<div class=" flex justify-between m-7"><Posts {data} /></div>

<style>
</style>
