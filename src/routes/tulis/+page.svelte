<script lang="ts">
	import '../../app.postcss';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';

	import Placeholder from '@tiptap/extension-placeholder';
	import Document from '@tiptap/extension-document';

	let editor: Readable<Editor>;

	export let data;
	const CustomDocument = Document.extend({
		content: 'heading block*'
	});

	onMount(() => {
		editor = createEditor({
			extensions: [
				CustomDocument,
				StarterKit.configure({ document: false }),
				Placeholder.configure({
					placeholder: ({ node }) => {
						if (node.type.name === 'heading' || node.attrs.level == 1) {
							return 'Whats the title?';
						}

						return 'Can you add some further context?';
					}
				})
			],
			content: `
      <h1>
        It’ll always have a heading …
      </h1>
      <p>
        … if you pass a custom document. That’s the beauty of having full control over the schema.
      </p>
    `
		});
	});
</script>

<nav class="bg-[#D9D9D9] flex justify-between p-3 items-center fixed top-0 w-full z-10">
	<a class="font-extrabold text-lg" href="/"><span class="text-[#0093ED]">SMART</span> OFFICE</a>

	<div class="m-auto">
		<div>
			<button
				on:click={() => $editor?.chain().focus().toggleBold().run()}
				disabled={!$editor?.can().chain().focus().toggleBold().run()}
				class={$editor?.isActive('bold') ? 'font-bold' : ''}
			>
				bold
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleItalic().run()}
				disabled={!$editor?.can().chain().focus().toggleItalic().run()}
				class={$editor?.isActive('italic') ? 'is-active' : ''}
			>
				italic
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleStrike().run()}
				disabled={!$editor?.can().chain().focus().toggleStrike().run()}
				class={$editor?.isActive('strike') ? 'is-active' : ''}
			>
				strike
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleCode().run()}
				disabled={!$editor?.can().chain().focus().toggleCode().run()}
				class={$editor?.isActive('code') ? 'is-active' : ''}
			>
				code
			</button>
			<button on:click={() => $editor?.chain().focus().unsetAllMarks().run()}> clear marks </button>
			<button on:click={() => $editor?.chain().focus().clearNodes().run()}> clear nodes </button>
			<button
				on:click={() => $editor?.chain().focus().setParagraph().run()}
				class={$editor?.isActive('paragraph') ? 'is-active' : ''}
			>
				paragraph
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleHeading({ level: 1 }).run()}
				class={$editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''}
			>
				h1
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleHeading({ level: 2 }).run()}
				class={$editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
			>
				h2
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleHeading({ level: 3 }).run()}
				class={$editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''}
			>
				h3
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleHeading({ level: 4 }).run()}
				class={$editor?.isActive('heading', { level: 4 }) ? 'is-active' : ''}
			>
				h4
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleHeading({ level: 5 }).run()}
				class={$editor?.isActive('heading', { level: 5 }) ? 'is-active' : ''}
			>
				h5
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleHeading({ level: 6 }).run()}
				class={$editor?.isActive('heading', { level: 6 }) ? 'is-active' : ''}
			>
				h6
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleBulletList().run()}
				class={$editor?.isActive('bulletList') ? 'is-active' : ''}
			>
				bullet list
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleOrderedList().run()}
				class={$editor?.isActive('orderedList') ? 'is-active' : ''}
			>
				ordered list
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleCodeBlock().run()}
				class={$editor?.isActive('codeBlock') ? 'is-active' : ''}
			>
				code block
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleBlockquote().run()}
				class={$editor?.isActive('blockquote') ? 'is-active' : ''}
			>
				blockquote
			</button>
			<button on:click={() => $editor?.chain().focus().setHorizontalRule().run()}>
				horizontal rule
			</button>
			<button on:click={() => $editor?.chain().focus().setHardBreak().run()}> hard break </button>
			<button
				on:click={() => $editor?.chain().focus().undo().run()}
				disabled={!$editor?.can().chain().focus().undo().run()}
			>
				undo
			</button>
			<button
				on:click={() => $editor?.chain().focus().redo().run()}
				disabled={!$editor?.can().chain().focus().redo().run()}
			>
				redo
			</button>
		</div>
	</div>
</nav>

<div class="tipedit">
	<EditorContent editor={$editor} />
</div>

<style>
	:global(.tipedit .tiptap) {
		padding: 5px;
		min-height: 70vh;
		width: 50%;
		margin: auto;
	}
	:global(.tipedit .tiptap p.is-editor-empty:first-child::before) {
		color: #adb5bd;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
</style>
