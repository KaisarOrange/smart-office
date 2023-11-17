<script>
	import '../app.postcss';
	export let data;
	import Posts from '$lib/Posts/Posts.svelte';
</script>

<div class=" flex justify-between m-6"><Posts data={data.posts.data} /></div>

<style>
</style>
