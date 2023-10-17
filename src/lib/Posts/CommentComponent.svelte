<script lang="ts">
	export let comments: any;
	import { Avatar } from '@skeletonlabs/skeleton';
	import LikeShareComment from './LikeShareComment.svelte';
	let commentValue: any;
	let liked: boolean;
	let commentClick: boolean;
</script>

<div class="mt-6">
	{#each comments as comment}
		<div class="flex gap-2 my-2">
			<div>
				<Avatar src={comment.user_img} width={'w-10'} />
			</div>
			<div class="flex flex-col items-start">
				<p class="font-semibold">{comment.user_name}</p>
				<p>{comment.comment.comment}</p>
				<LikeShareComment bind:liked bind:commentClick />
				<div>
					{#if commentClick}
						{#each comments as comment}
							{#if comment.comment.comments}
								<div class="flex h-fit mt-2 gap-2">
									<div>
										<Avatar src={'/alif.png'} width={'w-10'} />
									</div>
									<div
										bind:innerText={commentValue}
										contenteditable
										class="textarea w-96 bg-white px-2 py-2"
									/>

									<button
										on:click={() => {
											// addComment();
										}}
										class="btn bg-[#0093ED] h-10 text-white font-semibold text-sm rounded-sm"
										>Tambah komentar</button
									>
								</div>
								<!-- <div contenteditable class="textarea bg-white px-2 py-2 h-10" /> -->
								<svelte:self {...comment.comment} />
							{:else}
								<!-- <div class="flex h-fit mt-2 gap-2">
									<div>
										<Avatar src={'/alif.png'} width={'w-10'} />
									</div>
									<div
										bind:innerText={commentValue}
										contenteditable
										class="textarea w-96 bg-white px-2 py-2"
									/>
									<button
										on:click={() => {
											//addComment();
										}}
										class="btn bg-[#0093ED] h-10 text-white font-semibold text-sm rounded-sm"
										>Tambah komentar</button
									>
								</div> -->
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>
