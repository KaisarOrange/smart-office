<script>
	// @ts-nocheck

	export let data;
	import Posts from '$lib/Posts/Posts.svelte';
	import PostsMoreComponent from '$lib/Posts/PostsMoreComponent.svelte';
	import Spinner from '$lib/Spinner/Spinner.svelte';
</script>

{#await data.streamed?.posts}
	<Spinner />
{:then posts}
	<div class="mt-24 flex justify-between m-6">
		<Posts data={[posts.data]} user={data.stream?.users} allow={data.allowed} />
	</div>
{/await}
