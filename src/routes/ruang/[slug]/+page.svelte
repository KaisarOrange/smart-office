<script>
	import Posts from '$lib/Posts/Posts.svelte';
	import Anggota from '$lib/Anggota.svelte';
	import Todo from '$lib/Todo/Todo.svelte';

	// export let data;
</script>

<div class="flex justify-between m-6">
	<Anggota />
	<!-- <Posts {data} /> -->
	<Todo />
</div>
