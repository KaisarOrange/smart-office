<script lang="ts">
	export let comment: any;
	import { Avatar } from '@skeletonlabs/skeleton';
	import LikeShareComment from './LikeShareComment.svelte';
	import { each } from 'lodash';
	let commentValue: any;
	let liked: boolean;
	let commentClick: boolean;
</script>

<div class="mt-6 w-full box-border">
	<div class="flex gap-2 my-2">
		<div>
			<Avatar src={comment.user_img} width={'w-10'} />
		</div>
		<div class="flex flex-col items-start flex-1">
			<p class="font-semibold">{comment.user_name}</p>
			<p>{comment.text}</p>
			<LikeShareComment bind:liked bind:commentClick />

			{#if commentClick}
				{#if comment.comments}
					<div class="flex h-fit mt-2 gap-2 w-full">
						<div>
							<Avatar src={'/alif.png'} width={'w-10'} />
						</div>
						<div class="flex flex-col flex-1">
							<div class="flex flex-col items-end">
								<div
									bind:innerText={commentValue}
									contenteditable
									class="textarea w-full break-all bg-white px-2 py-2"
								/>
								<div>
									<button
										on:click={() => {
											// addComment();
										}}
										class="btn w-fit px-2 py-1.5 mt-1 text-black font-semibold text-sm rounded-sm"
										>Batal</button
									>
									<button
										on:click={() => {
											// addComment();
										}}
										class="btn bg-[#0093ED] w-fit px-2 py-1.5 mt-1 text-white font-semibold text-sm rounded-sm"
										>Balas</button
									>
								</div>
							</div>
						</div>
					</div>

					{#each comment.comments as commente}
						<svelte:self comment={commente} />
					{/each}
				{:else}
					<div class="flex h-fit w-full mt-2 gap-2">
						<div>
							<Avatar src={'/alif.png'} width={'w-10'} />
						</div>
						<div class="flex flex-col flex-1 w-full">
							<div
								bind:innerText={commentValue}
								contenteditable
								class="textarea flex-col w-full break-all bg-white px-2 py-2"
							/>
							<div>
								<button
									on:click={() => {
										//addComment();
									}}
									class="btn bg-[#0093ED] h-10 left-0 text-white font-semibold text-sm rounded-sm"
									>Balas</button
								>
							</div>
						</div>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>
