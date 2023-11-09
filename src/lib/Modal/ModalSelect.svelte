<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { editorJson } from '$lib/Stores/editorOutput';

	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
	import { postPosts } from '$lib/postPosts';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// Local
	let flavor = 'chocolate';
	const modalStore = getModalStore();

	// Handle Form Submission
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(flavor);
		postPosts();
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cListButton = 'bg-blue_office';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase} ">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<ListBox
			class="border border-surface-500 p-3 rounded-container-token overflow-x-hidden  h-48 overflow-scroll"
		>
			<ListBoxItem
				class={flavor === 'chocolate' ? cListButton : ''}
				bind:group={flavor}
				name="chocolate"
				value="chocolate">Chocolate</ListBoxItem
			>
			<ListBoxItem
				class={flavor === 'vanilla' ? cListButton : ''}
				bind:group={flavor}
				name="vanilla"
				value="vanilla">Vanilla</ListBoxItem
			>
			<ListBoxItem
				class={flavor === 'strawberry' ? cListButton : ''}
				bind:group={flavor}
				name="strawberry"
				value="strawberry">Strawberry</ListBoxItem
			>
			<ListBoxItem
				class={flavor === 'peach' ? cListButton : ''}
				bind:group={flavor}
				name="peach"
				value="peach">Peach</ListBoxItem
			>
			<ListBoxItem
				class={flavor === 'apple' ? cListButton : ''}
				bind:group={flavor}
				name="apple"
				value="apple">Apple</ListBoxItem
			>
			<ListBoxItem
				class={flavor === 'banana' ? cListButton : ''}
				bind:group={flavor}
				name="banana"
				value="banana">Banana</ListBoxItem
			>
		</ListBox>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral} bg-transparent border border-black" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive} text-white " on:click={onFormSubmit}>Unggah</button>
    </footer>
	</div>
{/if}
