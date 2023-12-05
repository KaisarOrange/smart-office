<script>
	import Posts from '$lib/Posts/Posts.svelte';
	import Anggota from '$lib/Anggota.svelte';
	import Todo from '$lib/Todo/Todo.svelte';
	import { currentRuang } from '$lib/Stores/editorOutput';

	export let data;

	const userInfo = { username: data.user.data.user_name, photo: data.user.data.photo_url };

	$currentRuang = data.ruang.data.name;
</script>

<div class="flex justify-between m-6">
	<Anggota data={data.ruang.data.user} />
	<Posts data={data.ruang.data.posts} {userInfo} />
	<Todo />
</div>
