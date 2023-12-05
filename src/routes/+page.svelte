<script>
	import '../app.postcss';
	export let data;
	import Posts from '$lib/Posts/Posts.svelte';
	const userInfo = { username: data.user.data.user_name, photo: data.user.data.photo_url };
</script>

<div class=" flex justify-between m-6"><Posts data={data.posts.data} {userInfo} /></div>

<style>
</style>
