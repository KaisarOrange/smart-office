<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import LikeShareComment from './LikeShareComment.svelte';
	export let comment: boolean;
	let commentValue: any;
	let comments: any[] = [
		{
			user_name: 'James Hamilton',
			user_img: 'https://source.unsplash.com/hr7eefjrekI',
			comment: 'Great article!',
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
			<textarea
				bind:value={commentValue}
				class="textarea h-10 rounded-sm bg-white"
				placeholder="Tambahkan komentar..."
			/>
			<button
				on:click={() => {
					addComment();
				}}
				class="btn bg-[#0093ED] text-white font-semibold text-sm rounded-sm">Tambah komentar</button
			>
		</div>
		<div class="mt-6">
			{#each comments as comment}
				<div class="flex gap-2 my-2">
					<div>
						<Avatar src={comment.user_img} width={'w-10'} />
					</div>
					<div class="flex flex-col items-start">
						<p class="font-semibold">{comment.user_name}</p>
						<p>{comment.comment}</p>
						<LikeShareComment />
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
