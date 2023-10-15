<script lang="ts">
	import '../../app.postcss';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';
	import Youtube from '@tiptap/extension-youtube';
	import CharacterCount from '@tiptap/extension-character-count';
	import Placeholder from '@tiptap/extension-placeholder';
	import Document from '@tiptap/extension-document';
	let active: boolean = false;
	let editor: Readable<Editor>;

	let currentActiveFont: string;

	const CustomDocument = Document.extend({
		content: 'heading block*'
	});

	const addYoutubeVideo = () => {
		const url = prompt('Enter YouTube URL');

		if (url) {
			$editor?.commands.setYoutubeVideo({
				src: url,
				width: 640,
				height: 480
			});
		}
	};

	onMount(() => {
		editor = createEditor({
			extensions: [
				CustomDocument,
				CharacterCount,
				Youtube,
				StarterKit.configure({ document: false }),
				Placeholder.configure({
					placeholder: ({ node }) => {
						if (node.type.name === 'heading') {
							return 'Tambahkan judul...';
						}
						return 'tulis...';
					}
				})
			]
		});
	});
</script>

<svelte:window on:click={(e) => (active = false)} />

<nav class="bg-[#D9D9D9] flex justify-between py-4 px-8 items-center fixed top-0 w-full z-10">
	<a class="font-extrabold text-lg" href="/"><span class="text-[#0093ED]">SMART</span> OFFICE</a>

	<div class="m-auto flex items-center gap-4">
		<div>
			<div
				class="cursor-pointer select-none font-semibold"
				on:click|stopPropagation={() => {
					active = !active;
				}}
				on:keydown={() => {}}
				aria-hidden
			>
				{$editor?.isActive('heading', { level: 1 })
					? 'Heading 1'
					: $editor?.isActive('heading', { level: 2 })
					? 'Heading 2'
					: $editor?.isActive('heading', { level: 3 })
					? 'Heading 3'
					: 'Paragraf'}
				<i class="ri-arrow-down-s-line" />
			</div>
			<div
				on:click|stopPropagation={() => {
					active = !active;
				}}
				on:keydown={() => {}}
				aria-hidden
				class="{active ? '' : 'hidden'} absolute top-[68px] bg-[#D9D9D9] p-1 rounded-sm"
			>
				<div class="bg-white p-3">
					<div
						on:click={() => $editor?.chain().focus().setParagraph().run()}
						class="{$editor?.isActive('paragraph')
							? 'font-bold text-[#0093ED]'
							: ''} cursor-pointer"
						on:keydown={() => {}}
						aria-hidden
					>
						<p class="text-base mb-1">Paragraf</p>
					</div>
					<div
						on:click={() => $editor?.chain().focus().toggleHeading({ level: 1 }).run()}
						class="{$editor?.isActive('heading', { level: 1 })
							? 'font-bold text-[#0093ED]'
							: ''} cursor-pointer"
						on:keydown={() => {}}
						aria-hidden
					>
						<p class="text-xl font-semibold mb-1">Heading 1</p>
					</div>
					<div
						on:click={() => $editor?.chain().focus().toggleHeading({ level: 2 }).run()}
						class="{$editor?.isActive('heading', { level: 2 })
							? 'font-bold text-[#0093ED]'
							: ''} cursor-pointer"
						on:keydown={() => {}}
						aria-hidden
					>
						<p class="text-lg font-medium mb-1">Heading 2</p>
					</div>
					<div
						on:click={() => $editor?.chain().focus().toggleHeading({ level: 3 }).run()}
						class="{$editor?.isActive('heading', { level: 3 })
							? 'font-bold text-[#0093ED]'
							: ''} cursor-pointer"
						on:keydown={() => {}}
						aria-hidden
					>
						<p class="text-base font-normal mb-1">Heading 3</p>
					</div>
				</div>
			</div>
		</div>
		<div class="flex items-center gap-3">
			<button
				on:click={() => $editor?.chain().focus().toggleBold().run()}
				disabled={!$editor?.can().chain().focus().toggleBold().run()}
				class={$editor?.isActive('bold') ? 'font-bold' : ''}
			>
				<i class="ri-bold text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleItalic().run()}
				disabled={!$editor?.can().chain().focus().toggleItalic().run()}
				class={$editor?.isActive('italic') ? 'font-bold' : ''}
			>
				<i class="ri-italic text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleStrike().run()}
				disabled={!$editor?.can().chain().focus().toggleStrike().run()}
				class={$editor?.isActive('strike') ? 'font-bold' : ''}
			>
				<i class="ri-strikethrough text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleCode().run()}
				disabled={!$editor?.can().chain().focus().toggleCode().run()}
				class={$editor?.isActive('code') ? 'font-bold' : ''}
			>
				<i class="ri-code-line text-lg" />
				<!-- code -->
			</button>
			<!-- <button on:click={() => $editor?.chain().focus().unsetAllMarks().run()}> clear marks </button>
			<button on:click={() => $editor?.chain().focus().clearNodes().run()}> clear nodes </button> -->

			<button
				on:click={() => $editor?.chain().focus().toggleBulletList().run()}
				class={$editor?.isActive('bulletList') ? 'font-bold' : ''}
			>
				<i class="ri-list-unordered text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleOrderedList().run()}
				class={$editor?.isActive('orderedList') ? 'font-bold' : ''}
			>
				<i class="ri-list-ordered-2 text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleCodeBlock().run()}
				class={$editor?.isActive('codeBlock') ? 'font-bold' : ''}
			>
				<i class="ri-code-box-line text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleBlockquote().run()}
				class={$editor?.isActive('blockquote') ? 'font-bold' : ''}
			>
				<i class="ri-double-quotes-l text-lg" />
			</button>

			<button
				on:click={() => addYoutubeVideo()}
				class={$editor?.isActive('blockquote') ? 'font-bold' : ''}
			>
				<i class="ri-youtube-line text-lg" />
			</button>

			<!-- <button on:click={() => $editor?.chain().focus().setHorizontalRule().run()}>
				horizontal rule
			</button> -->
			<!-- <button on:click={() => $editor?.chain().focus().setHardBreak().run()}> hard break </button> -->
			<button
				on:click={() => $editor?.chain().focus().undo().run()}
				disabled={!$editor?.can().chain().focus().undo().run()}
			>
				<i class="ri-arrow-go-back-fill text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().redo().run()}
				disabled={!$editor?.can().chain().focus().redo().run()}
			>
				<i class="ri-arrow-go-forward-fill text-lg" />
			</button>
		</div>
	</div>

	<div class="flex items-center gap-5">
		{$editor?.storage.characterCount.words()} kata
		<div class="">
			<button class="btn font-semibold rounded-sm px-2 py-1 mr-2">Simpan draft</button>
			<button class="btn bg-[#0093ED] text-white font-semibold rounded-sm px-2 py-1">Unggah</button>
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
		outline: none;
		margin: auto;
	}
	:global(.tipedit .tiptap h1) {
		font-size: 18px;
	}

	:global(.tipedit .tiptap p.is-editor-empty:first-child::before) {
		color: #adb5bd;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
	:global(.tipedit .tiptap .is-empty::before) {
		content: attr(data-placeholder);
		float: left;
		color: #ced4da;
		pointer-events: none;
		height: 0;
	}
</style>
