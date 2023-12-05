<script>
	import Posts from '$lib/Posts/Posts.svelte';
	import Anggota from '$lib/Anggota.svelte';
	import Todo from '$lib/Todo/Todo.svelte';
	import Profil from './Profil.svelte';
	import { afterUpdate } from 'svelte';

	export let data;
	let selected = 0;
	const posts = data.user.data.posts;
	const draft = data.draft.data;
	const like = data.like.data.user_like;
	const choice = [posts, draft, like];
	$: dataPost = choice[selected];
	// selected === 0 ? draft : posts;
	afterUpdate(() => {});
	const userInfo = { username: data.user.data.user_name, photo: data.user.data.photo_url };
</script>

<div class="flex justify-between m-6">
	<Profil data={data.user.data} bind:selected />
	{#if selected === 0}
		<Posts data={posts} {userInfo} />
	{:else if selected === 1}
		<Posts data={draft} {userInfo} />
	{:else}
		<Posts data={like} {userInfo} />
	{/if}
	<Todo />
</div>
