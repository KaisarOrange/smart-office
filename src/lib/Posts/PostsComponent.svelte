<script lang="ts">
	import PostComponentComment from './PostComponentComment.svelte';
	import { afterUpdate, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { postLike } from '$lib/functions/postLike';
	import { countElements } from './functions/commentCounter';
	import { env } from '$env/dynamic/public';

	export let id: number;
	export let user_like: any;
	console.log(user_like);
	let liked: boolean;
	let commentClicked: boolean = false;
	export let comments: any;

	console.log(comments);

	let commentCount: number = 0;

	let likeCount: number = 0;

	let commentData = writable(comments);
	onMount(async () => {
		if (user_like?.length > 0) {
			liked = true;
		} else {
			liked = false;
		}

		try {
			const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/like/${id}`);
			const data = await res.json();
			likeCount = data?.like_count;
		} catch (err) {
			console.log('hello: ', err);
		}
	});

	setContext('comments', commentData);

	afterUpdate(() => {
		commentCount = countElements(comments);
	});

	if (comments) {
		commentCount = countElements(comments);
	}
</script>

<div class="bg-white p-2 mt-2 rounded-sm">
	<div class=" flex justify-center items-center gap-4">
		<div class="flex items-center">
			<svg
				class="cursor-pointer stroke-[#0093ED] {liked ? 'fill-[#0093ED]' : 'fill-none'}"
				on:click={() => {
					postLike(liked, id);
					liked = !liked;
					liked ? likeCount++ : likeCount--;
				}}
				on:keydown={() => {}}
				aria-hidden
				width="30px"
				height="30px"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<p class="text-xs">{likeCount}</p>
		</div>
		<div class="flex items-center justify-center">
			<img
				on:click={() => {
					commentClicked = !commentClicked;
				}}
				on:keydown={() => {}}
				aria-hidden
				class="w-8 h-8 cursor-pointer"
				src="/comment.svg"
				alt=""
			/>
			{#if comments}
				<p class="text-xs">{commentCount}</p>
			{/if}
		</div>
		<div class="">
			<!-- <img class="w-7 h-7" src="/send.svg" alt="" /> -->
			<button class="btn bg-blue_office text-white font-semibold px-2 py-0.5 rounded sm"
				>Lanjut baca</button
			>
		</div>
	</div>

	<PostComponentComment {commentClicked} {id} />
</div>
