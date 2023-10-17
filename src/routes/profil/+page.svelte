<script>
	import Posts from '$lib/Posts/Posts.svelte';
	import Anggota from '$lib/Anggota.svelte';
	import Todo from '$lib/Todo/Todo.svelte';
	import Profil from './Profil.svelte';

	export let data;
</script>

<div class="flex justify-between m-6">
	<Profil />
	<Posts {data} />
	<Todo />
</div>
