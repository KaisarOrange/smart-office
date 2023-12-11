<script>
	// @ts-nocheck

	export let data;
	import Posts from '$lib/Posts/Posts.svelte';
</script>

{#await data.streamed?.posts}
	<div>hello</div>
{:then posts}
	<div class="mt-24 flex justify-between m-6">
		<Posts data={posts.data} user={data.stream?.users} />
	</div>
{/await}

<style>
</style>
