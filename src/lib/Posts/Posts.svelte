<script lang="ts">
	import { setContext } from 'svelte';
	import PostsComponent from './PostsComponent.svelte';
	import PostsKonten from './PostsKonten.svelte';
	import PostsMoreComponent from './PostsMoreComponent.svelte';
	export let data: any;
	export let user;
	const userInfoo = { username: '', photo: '' };

	user.then((res) => {
		userInfoo.username = res.data.user_name;
		userInfoo.photo = res.data.photo_url;
	});

	setContext('userinfo', userInfoo);
	const datehe = (dateInput: Date) => {
		const monthList = [
			'Januari',
			'Febuari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember'
		];
		let date = new Date(dateInput);
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();

		const fullDate = `${day}  ${monthList[month]}`;
		return fullDate.toString();
	};
</script>

<div class="w-1/2 flex flex-col items-center gap-5 mx-auto">
	{#if data}
		{#each data as { user, draft, created_at, ruang, konten, comment, id, user_like }}
			<div class="bg-[#D9D9D9] rounded-sm p-2 min-w-full max-w-full">
				<div class="bg-white px-4 py-2 rounded-sm">
					<div class="flex justify-between items-center">
						<div class="flex items-center gap-2">
							<div class="flex items-center gap-2 font-light my-3">
								<img class="w-10 h-10 object-cover rounded-full" src={user.photo_url} alt="" />
								<p>{user.user_name} . {datehe(created_at)}</p>
							</div>
							<div class="font-extralight">|</div>
							<div class="flex items-center gap-2 font-light">
								<p>{ruang.name}</p>
							</div>
							<div class="font-extralight" />
							<div class="font-extralight text-blue_office">
								{draft ? 'Draft' : ''}
							</div>
						</div>
						<PostsMoreComponent {konten} {id} />
					</div>
					<div class="tiptap"><PostsKonten {konten} /></div>
				</div>
				<PostsComponent comments={comment.comments} {id} {user_like} />
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.tiptap {
		:global(p::after) {
			content: '';
			display: inline-block;
			width: 0px;
		}
		:global(> * + *) {
			margin-top: 0.75em;
		}

		:global(h1) {
			font-size: 18px;
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
