<script lang="ts">
	import PostsComponent from './PostsComponent.svelte';
	export let data: any;
</script>

<div class="w-1/2 flex flex-col items-center gap-5 mx-auto">
	{#each data.posts as { content, author_name, author_img, title, img, ruang }}
		<div class="bg-[#D9D9D9] rounded-sm p-2">
			<div class="bg-white px-4 py-2 rounded-sm">
				<div class="flex items-center gap-2">
					<div class="flex items-center gap-2 font-light my-3">
						<img class="w-10 h-10 object-cover rounded-full" src={author_img} alt="" />
						<p>{author_name} . 11 September 2023</p>
					</div>
					<div class="font-extralight">|</div>
					<div class="flex items-center gap-2 font-light">
						<img class="w-10 h-10 object-cover rounded-full" src={img} alt="" />
						<p>{ruang}</p>
					</div>
				</div>
				<h1 class="text-lg font-bold">{title}</h1>
				<div class="tiptap">{@html content}</div>
			</div>
			<PostsComponent />
		</div>
	{/each}
</div>

<style lang="scss">
	.tiptap {
		:global(> * + *) {
			margin-top: 0.75em;
		}

		:global(h1) {
			line-height: 1.1;
		}

		:global(h2) {
			line-height: 1.1;
		}

		:global(code) {
			background-color: rgba(#616161, 0.1);
			color: #616161;
		}

		:global(pre) {
			background: #0d0d0d;
			color: #fff;
			font-family: 'JetBrainsMono', monospace;
			padding: 0.75rem 1rem;
			border-radius: 0.5rem;

			:global(code) {
				color: inherit;
				padding: 0;
				background: none;
				font-size: 0.8rem;
			}
		}

		:global(img) {
			max-width: 100%;
			height: auto;
		}

		:global(blockquote) {
			padding-left: 1rem;
			border-left: 2px solid rgba(#0d0d0d, 0.1);
		}

		:global(hr) {
			border: none;
			border-top: 2px solid rgba(#0d0d0d, 0.1);
			margin: 2rem 0;
		}
	}
</style>
