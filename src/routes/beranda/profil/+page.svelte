<script>
	// @ts-nocheck

	import Posts from '$lib/Posts/Posts.svelte';
	import Todo from '$lib/Todo/Todo.svelte';
	import Profil from './Profil.svelte';

	export let data;
	let selected = 0;
</script>

<div class="flex justify-between m-6 mt-24">
	{#if data}
		{#await data?.stream?.users}
			<div>hello</div>
		{:then users}
			<Profil data={users.data} bind:selected />
		{/await}
		{#if selected === 0}
			{#await data.stream.users}
				<div>hello</div>
			{:then users}
				<Posts data={users.data.posts} user={data.stream?.users} />
			{/await}
		{:else if selected === 1}
			{#await data.stream_profile?.draft}
				<div>hello</div>
			{:then draft}
				<Posts data={draft.data} user={data.stream?.users} />
			{/await}
		{:else}
			{#await data.stream_profile?.like}
				<div>hello</div>
			{:then like}
				<Posts data={like.data.user_like} user={data.stream?.users} />
			{/await}
		{/if}
		{#await data.stream.users}
			<div>hello</div>
		{:then users}
			<Todo data={users.data?.reminders} />
		{/await}
	{/if}
</div>
