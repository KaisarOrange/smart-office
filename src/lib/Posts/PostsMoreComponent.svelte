<script lang="ts">
	import { currentPost } from '$lib/Stores/editorOutput';
	import { fade, fly } from 'svelte/transition';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { postDelete } from '$lib/functions/postDelete';

	let clicked = false;

	let post_id = '';

	export let konten: any;
	export let id: any;

	const modal: ModalSettings = {
		type: 'component',
		component: 'modalEditPost',
		response: (r: boolean) => {
			console.log(r);
		}
	};

	const modalHapus: ModalSettings = {
		type: 'confirm',
		component: 'modalEditPost',
		title: 'Hapus tulisan?',
		body: 'Anda akan menghapus tulisan ini dari beranda anda.',
		response: (r: boolean) => {
			if (r === true) {
				postDelete(id);
			}
		}
	};

	const modalStore = getModalStore();
</script>

<svelte:window on:click={(e) => (clicked = false)} />

<div on:keydown={() => {}} aria-hidden on:click|stopPropagation={() => {}}>
	<i
		on:click|stopPropagation={() => {
			clicked = !clicked;
		}}
		on:keydown={() => {}}
		aria-hidden
		class="ri-more-fill text-lg cursor-pointer select-none"
	/>
	{#if clicked}
		<div transition:fly={{ y: -10, duration: 200 }} class="bg-grey_office p-1 absolute">
			<div class="flex-col bg-white p-1">
				<div
					on:click={() => {
						$currentPost = { konten: konten, id: id };
						modalStore.trigger(modal);
					}}
					on:keydown={() => {}}
					aria-hidden
					class="btn flex items-center justify-start p-1 select-none cursor-pointer"
				>
					<i class="ri-edit-2-line" />
					<div>Edit</div>
				</div>
				<div
					on:click={() => {
						$currentPost = { konten: konten, id: id };
						modalStore.trigger(modalHapus);
					}}
					on:keydown={() => {}}
					aria-hidden
					class="btn flex items-center justify-start p-1 select-none cursor-pointer"
				>
					<i class="ri-delete-bin-line" />
					<div>Hapus</div>
				</div>
				<!-- <div
					on:click={() => {
						$currentPost = { konten: konten, id: id };
						// modalStore.trigger(modal);
					}}
					on:keydown={() => {}}
					aria-hidden
					class="btn flex items-center justify-start p-1 select-none cursor-pointer"
				>
					<i class="ri-star-line" />
					<div>Simpan</div>
				</div> -->
			</div>
		</div>
	{/if}
</div>
