<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	import CommentComponent from './CommentComponent.svelte';
	import { getContext } from 'svelte';
	import { postComment } from '$lib/functions/postComment';
	export let commentClicked: boolean;

	export let userInfo: any;
	export let id: number;
	let commentValue: any;
	let comments: any = getContext('comments');
	console.log(userInfo);
	// {
	// 		user_name: 'James Hamilton',
	// 		user_img: 'https://source.unsplash.com/hr7eefjrekI',
	// 		text: 'Hey nice!',
	// 		comments: [
	// 			{
	// 				user_name: 'Alif',
	// 				user_img: '/alif.png',
	// 				text: 'Thanks!',
	// 				comments: [
	// 					{
	// 						user_name: 'James Hamilton',
	// 						user_img: 'https://source.unsplash.com/hr7eefjrekI',
	// 						text: 'Your Welcome!',
	// 						like: 10
	// 					}
	// 				],
	// 				like: 10
	// 			}
	// 		],
	// 		like: 10
	// 	}

	const addComment = () => {
		$comments = [
			...$comments,
			{
				user_name: userInfo.username,
				user_img: userInfo.photo,
				text: commentValue,
				like: 10
			}
		];

		postComment(id, $comments);
	};
</script>

{#if commentClicked}
	<div class="mx-2">
		<div class="flex h-fit justify-center mt-2 gap-2">
			<div>
				<Avatar src={userInfo.photo} width={'w-10'} />
			</div>
			<div
				bind:innerText={commentValue}
				placeholder="Tambahkan komentar..."
				contenteditable
				class="textarea break-all bg-white px-2 py-2"
			/>

			<button
				on:click={() => {
					addComment();
				}}
				class="btn bg-[#0093ED] h-10 text-white font-semibold text-sm rounded-sm"
				>Tambah komentar</button
			>
		</div>
		{#each $comments as comment}
			<CommentComponent {comment} {id} {userInfo} />
		{/each}
	</div>
{/if}
