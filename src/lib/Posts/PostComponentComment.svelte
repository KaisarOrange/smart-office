<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import LikeShareComment from './LikeShareComment.svelte';
	import PostComponentComment from './PostComponentComment.svelte';
	import PostsComponent from './PostsComponent.svelte';
	import CommentComponent from './CommentComponent.svelte';
	export let comment: boolean;

	let commentValue: any;
	let cs: number = 10;
	let textAreaWidth: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90];
	let currentTextAreaWidth: number = textAreaWidth[0];
	let comments: any[] = [
		{
			user_name: 'James Hamilton',
			user_img: 'https://source.unsplash.com/hr7eefjrekI',
			comment: {
				comment: 'Great article!',
				comments: [
					{
						user_name: 'Alif',
						user_img: '/alif.png',
						comment: {
							comment: 'Thanks!',
							comments: [
								{
									user_name: 'James Hamilton',
									user_img: 'https://source.unsplash.com/hr7eefjrekI',
									comment: { comment: 'Your Welcome!' },
									like: 10
								}
							]
						},
						like: 10
					}
				]
			},
			like: 10
		}
	];

	const addComment = () => {
		comments = [
			...comments,
			{
				user_name: 'Alif Ayodya',
				user_img: '/alif.png',
				comment: commentValue,
				like: 10
			}
		];
	};
</script>

{#if comment}
	<div class="mx-2">
		<div class="flex h-fit justify-center mt-2 gap-2">
			<div>
				<Avatar src={'/alif.png'} width={'w-10'} />
			</div>
			<div bind:innerText={commentValue} contenteditable class="textarea bg-white px-2 py-2" />
			<!-- <textarea
				contenteditable="true"
				bind:value={commentValue}
				class="textarea rounded-sm bg-white"
				placeholder="Tambahkan komentar..."
			/> -->
			<button
				on:click={() => {
					addComment();
				}}
				class="btn bg-[#0093ED] h-10 text-white font-semibold text-sm rounded-sm"
				>Tambah komentar</button
			>
		</div>
		<CommentComponent {comments} />
	</div>
{/if}

<!-- on:keydown={(e) => {
	if (e.key === 'Enter') {
		const currentTextAreaIndex = textAreaWidth.findIndex((e) => e === currentTextAreaWidth);
		if (currentTextAreaIndex < textAreaWidth.length - 1) {
			currentTextAreaWidth = textAreaWidth[currentTextAreaIndex + 1];
		}
		return;
	}
	if (e.key === 'Backspace') {
		const currentTextAreaIndex = textAreaWidth.findIndex((e) => e === currentTextAreaWidth);
		if (currentTextAreaIndex > 0) {
			currentTextAreaWidth = textAreaWidth[currentTextAreaIndex - 1];
		}
		return;
	}
}} -->
