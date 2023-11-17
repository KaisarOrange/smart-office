<script>
	import Posts from '$lib/Posts/Posts.svelte';
	import Anggota from '$lib/Anggota.svelte';
	import Todo from '$lib/Todo/Todo.svelte';
	import Profil from './Profil.svelte';

	export let data;
	let selected = 0;
	const posts = data.user.data.posts;
	const draft = data.draft.data;
	const like = null;
	const choice = [posts, draft, like];
	$: dataPost = choice[selected];
	// selected === 0 ? draft : posts;
</script>

<div class="flex justify-between m-6">
	<Profil data={data.user.data} bind:selected />
	<Posts data={dataPost} />
	<Todo />
</div>
