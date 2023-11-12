<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { editorJson } from '$lib/Stores/editorOutput';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { Avatar, ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
	import { postPosts } from '$lib/functions/postPosts';
	import { fade } from 'svelte/transition';
	import { v4 as uuidv4, NIL } from 'uuid';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Local
	let roomId = '';
	const modalStore = getModalStore();

	const roomsList = $modalStore[0].meta.ruang;
	console.log(NIL);
	function onFormSubmit(): void {
		// if ($modalStore[0].response) $modalStore[0].response(flavor);
		const konten: any = $editorJson;
		const ruangId: string = roomId;

		postPosts(ruangId, konten);
		modalStore.close();
	}

	let privatee: boolean = false;
	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cListButton = 'bg-blue_office overflow-hidden';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase} ">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<SlideToggle active={'bg-blue_office'} size="sm" name="slider-label" bind:checked={privatee}
			>{privatee ? 'private' : 'public'}</SlideToggle
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
        <button class="btn {parent.buttonNeutral} bg-transparent border border-black" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive} text-white " on:click={onFormSubmit}>Unggah</button>
    </footer>
	</div>
{/if}
