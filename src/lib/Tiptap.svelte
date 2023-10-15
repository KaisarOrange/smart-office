<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import Document from '@tiptap/extension-document';
	let element: any;
	let editor: any;
	const CustomDocument = Document.extend({
		content: 'heading block*'
	});
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({}),
				Placeholder.configure({
					placeholder: ({ node }) => {
						if (node.type.name === 'heading') {
							return 'What’s the title?';
						}

						return 'Can you add some further context?';
					}
				})
			],
			content: '<p>Hello World! 🌍️ </p>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{/if}

<div bind:this={element} />

<style>
	:global(.tiptap) {
		padding: 5px;
		min-height: 70vh;
		width: 50%;
		margin: auto;
	}
	button.active {
		background: black;
		color: white;
	}
</style>
