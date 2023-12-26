<script lang="ts">
	import { generateHTML } from '@tiptap/html';
	import '../../app.postcss';
	import StarterKit from '@tiptap/starter-kit';
	import Youtube from '@tiptap/extension-youtube';
	import CharacterCount from '@tiptap/extension-character-count';
	import Placeholder from '@tiptap/extension-placeholder';
	import Image from '@tiptap/extension-image';
	import { getContext, onMount } from 'svelte';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import type { Readable } from 'svelte/store';
	import Document from '@tiptap/extension-document';
	import TextAlign from '@tiptap/extension-text-align';
	import Mention from '@tiptap/extension-mention';

	export let konten: any;

	let clickedLanjut: any = getContext('clicked');
	let editor: Readable<Editor>;

	const CustomDocument = Document.extend({
		content: 'heading block*'
	});

	onMount(() => {
		editor = createEditor({
			extensions: [
				CharacterCount,
				CustomDocument,
				TaskList,
				TaskItem,
				Youtube,
				Mention.configure({
					HTMLAttributes: {
						class: 'mention'
					}
				}),
				Image.configure({
					allowBase64: true
				}),
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				StarterKit.configure({ document: false }),
				Placeholder.configure({
					placeholder: ({ node }) => {
						if (node.type.name === 'heading') {
							return 'Tambahkan judul...';
						}
						return 'tulis...';
					}
				})
			],
			content: konten,
			editable: false
		});
	});
</script>

<!-- <button on:click={() => (clicked = !clicked)}>test</button> -->

<!-- <div class="tipPost {$clickedLanjut ? '' : 'overflow-hidden max-h-[28rem] text-ellipsis '}">
	{@html generateHTML(konten, [Youtube, StarterKit, Image, TaskList, TaskItem])}
</div> -->

<div class="tipPost {$clickedLanjut ? '' : 'overflow-hidden max-h-[20rem] text-ellipsis '}">
	<EditorContent editor={$editor} />
</div>

<style>
	:global(.tipPost) {
		min-height: 65vh;
		outline: none;
		margin: auto;
	}

	/* :global(p::after) {
		content: '';
		display: inline-block;
		width: 0px;
	} */

	:global(.tipPost h1) {
		font-size: 18px;
	}

	:global(.tipPost p.is-editor-empty:first-child::before) {
		color: #adb5bd;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
	:global(.tipPost .is-empty::before) {
		content: attr(data-placeholder);
		float: left;
		color: #ced4da;
		pointer-events: none;
		height: 0;
	}

	:global(.tipPost pre) {
		background: #0d0d0d;
		color: #fff;
		font-family: 'JetBrainsMono', monospace;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
	}

	:global(.tipPost pre code) {
		color: inherit;
		padding: 0;
		background: none;
		font-size: 0.8rem;
	}

	:global(.tipPost code) {
		background: #cacaca;
		color: #616161;
	}

	:global(.tipPost img) {
		max-width: 100%;
		height: auto;
	}

	:global(.tipPost blockquote) {
		padding-left: 1rem;
		border-left: 2px solid rgba(#0d0d0d, 0.1);
	}

	:global(.tipPost ul) {
		padding-left: 1rem;
		@apply list-disc;
	}
	:global(.tipPost ol) {
		padding-left: 1rem;
		@apply list-decimal;
	}

	:global(.tipPost h1) {
		@apply text-xl;
	}
	:global(.tipPost h2) {
		@apply text-lg;
	}
	:global(.tipPost h3) {
		@apply text-base;
	}

	:global(.tipPost ul[data-type='taskList']) {
		list-style: none;
		padding: 0;
	}

	:global(.tipPost ul[data-type='taskList']) {
		list-style: none;
		padding: 0;
	}

	:global(.tipPost ul[data-type='taskList'] > li) {
		display: flex;
		align-items: center;
	}

	:global(.tipPost ul[data-type='taskList'] > li > label) {
		flex: 0 0 auto;
		margin-right: 0.5rem;
		user-select: none;
	}

	:global(.tipPost ul[data-type='taskList'] > li > label > div) {
		flex: 1 1 auto;
	}

	:global(.tipPost ul[data-type='taskList'] > li > label > input[type='checkbox']) {
		cursor: pointer;
	}
	:global(.tipPost ul[data-type='taskList'] > li > label > input[type='checkbox']:checked) {
		@apply bg-blue_office;
	}

	:global(.tipPost .mention) {
		/* cursor: pointer; */
		/* @apply bg-blue_office; */
		@apply border-blue_office text-blue_office;
		padding: 1px 4px;
		font-weight: 400;
		font-weight: 500;
		border-radius: 5px;
	}
</style>
