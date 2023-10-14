<script lang="ts">
	export let comments;
	import { Avatar } from '@skeletonlabs/skeleton';
	import LikeShareComment from './LikeShareComment.svelte';

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
								<svelte:self {...comment.comment} />
							{/if}
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>
