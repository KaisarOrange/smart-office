<script>
	import '../app.postcss';
	export let data;
	import Posts from '$lib/Posts/Posts.svelte';

	console.log('gello: ', data);
</script>

<div class=" flex justify-between m-6"><Posts data={data.posts.data} /></div>

<style>
</style>
