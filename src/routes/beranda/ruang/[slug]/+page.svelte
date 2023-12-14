<script>
	// @ts-nocheck

	import Posts from '$lib/Posts/Posts.svelte';
	import Anggota from '$lib/Anggota.svelte';
	import Todo from '$lib/Todo/Todo.svelte';
	import { currentRuang } from '$lib/Stores/editorOutput';

	export let data;

	// $currentRuang = data.ruang.data.name;

	data.ruang.ruangs.then((res) => ($currentRuang = res.data.name));
</script>

<div class="flex justify-between m-6 mt-24">
	{#await data.ruang.ruangs}
		<div>hello</div>
	{:then ruang}
		<Anggota data={ruang.data.user} />
		<Posts data={ruang.data.posts} user={data.stream?.users} />
		<Todo />
	{/await}
</div>
