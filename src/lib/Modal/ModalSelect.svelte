<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { editorJson, userID } from '$lib/Stores/editorOutput';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { Avatar, ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
	import { postPosts } from '$lib/functions/postPosts';
	import { fade } from 'svelte/transition';

	export let parent: SvelteComponent;

	// Local
	let roomId = '';
	let privatee: boolean = false;

	const modalStore = getModalStore();

	const roomsList = $modalStore[0].meta.ruang;
	function onFormSubmit(): void {
		// if ($modalStore[0].response) $modalStore[0].response(flavor);
		const konten: any = $editorJson;
		const ruangId: string = roomId;
		postPosts(ruangId, false, konten, privatee, $userID);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cListButton = 'bg-blue_office overflow-hidden';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase} ">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<SlideToggle
			on:click={() => {
				roomId = '';
			}}
			active={'bg-blue_office'}
			size="sm"
			name="slider-label"
			bind:checked={privatee}>{privatee ? 'private' : 'public'}</SlideToggle
		>

		{#if !privatee}
			<div transition:fade={{ duration: 200 }}>
				<ListBox
					class="border border-surface-500 p-3 rounded-container-token overflow-x-hidden  h-48 overflow-scroll"
				>
					{#each roomsList as { name, id }}
						<ListBoxItem
							class={roomId === id ? cListButton : 'overflow-hidden'}
							bind:group={roomId}
							{name}
							value={id}
						>
							<div class="flex items-center gap-3">
								<Avatar width={'w-9'} />
								{name}
							</div>
						</ListBoxItem>
					{/each}
				</ListBox>
			</div>
		{/if}

		<!-- prettier-ignore -->

		<footer class="modal-footer {parent.regionFooter}">
			<button
				class="btn {parent.buttonNeutral} bg-transparent border border-black"
				on:click={parent.onClose}>{parent.buttonTextCancel}</button
			>
			<button disabled={roomId === "" && privatee != true} class="btn {parent.buttonPositive} text-white" on:click={onFormSubmit}>Unggah</button>
		</footer>
	</div>
{/if}
