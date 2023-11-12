<script>
	import Posts from '$lib/Posts/Posts.svelte';
	import Anggota from '$lib/Anggota.svelte';
	import Todo from '$lib/Todo/Todo.svelte';

	export let data;
	console.log(data.ruang);
</script>

<div class="flex justify-between m-6">
	<Anggota data={data.ruang.data.user} />
	<Posts data={data.ruang.data.posts} />
	<Todo />
</div>
