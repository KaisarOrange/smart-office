<script lang="ts">
	import '../../app.postcss';
	import { goto } from '$app/navigation';
	import { onMount, SvelteComponent } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createEditor, Editor, EditorContent, SvelteRenderer } from 'svelte-tiptap';
	import Paragraph from '@tiptap/extension-paragraph';
	import { getModalStore, type ModalSettings, type ModalStore } from '@skeletonlabs/skeleton';
	import StarterKit from '@tiptap/starter-kit';
	import Youtube from '@tiptap/extension-youtube';
	import CharacterCount from '@tiptap/extension-character-count';
	import Placeholder from '@tiptap/extension-placeholder';
	import Image from '@tiptap/extension-image';
	import Document from '@tiptap/extension-document';
	import suggestion from '$lib/functions/suggestion';
	import { env } from '$env/dynamic/public';

	import {
		currentPost,
		currentRuang,
		editorJson,
		userID,
		userName
	} from '$lib/Stores/editorOutput';
	import { postPosts } from '$lib/functions/postPosts';
	import { generateHTML } from '@tiptap/html';
	import { postUpdate } from '$lib/functions/postUpdate';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import Collaboration from '@tiptap/extension-collaboration';
	import TextAlign from '@tiptap/extension-text-align';
	import Mention from '@tiptap/extension-mention';
	import { WebsocketProvider } from 'y-websocket';
	import * as Y from 'yjs';
	import CollaborationCursor from '@tiptap/extension-collaboration-cursor';

	let active: boolean = false;
	let editor: Readable<Editor>;

	let data: any;

	const id = $currentPost.id;

	let screenSize: any;
	const CustomDocument = Document.extend({
		content: 'heading block*'
	});

	const updateStore = () => {
		$editorJson = $editor.getJSON();
	};

	const addYoutubeVideo = () => {
		const url = prompt('Enter YouTube URL');

		if (url) {
			$editor?.commands.setYoutubeVideo({
				src: url,
				width: 640,
				height: 360
			});
		}
	};

	const modalStore: any = getModalStore();
	console.log($modalStore);

	const ydoc = new Y.Doc();
	// const provider = new WebrtcProvider('example-doc', ydoc);
	const providerWS = new WebsocketProvider('ws://' + env.PUBLIC_WS_URL + '/ws', 'room', ydoc);

	onMount(() => {
		//    const content = generateHTML(, [Youtube, StarterKit])
		editor = createEditor({
			extensions: [
				CustomDocument,
				TaskList,
				TaskItem,
				CharacterCount,
				Youtube,
				Collaboration.configure({
					document: ydoc
				}),
				CollaborationCursor.configure({
					provider: providerWS,
					user: {
						name: $userName,
						color: '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0')
					}
				}),
				Image.configure({
					allowBase64: true
				}),
				Mention.configure({
					HTMLAttributes: {
						class: 'mention'
					},
					suggestion
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
			editorProps: {
				handleDrop: function (view, event, slice, moved) {
					if (
						!moved &&
						event.dataTransfer &&
						event.dataTransfer.files &&
						event.dataTransfer.files[0]
					) {
						const { schema } = view.state;
						const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
						const node = schema.nodes.image.create({
							src: 'https://source.unsplash.com//376KN_ISplE'
						}); // creates the image element
						const transaction = view.state.tr.insert(coordinates!.pos, node); // places it in the correct position
						view.dispatch(transaction);
						return true;
					}

					return false;
				}
			},
			onUpdate: ({ editor }) => {
				$editorJson = editor.getJSON();
				// send the content to an API here
			},
			content: generateHTML($currentPost.konten, [
				StarterKit,
				Youtube,
				Image,
				TaskList,
				TaskItem,
				Mention
			])
		});
		$editorJson = $editor.getJSON();
	});
</script>

<!-- // if dropping external files
						let file = event.dataTransfer.files[0]; // the dropped file
						let filesize = (file.size / 1024 / 1024).toFixed(4); // get the filesize in MB
						if ((file.type === 'image/jpeg' || file.type === 'image/png') && filesize < 10) {
							// check valid image type under 10MB
							// check the dimensions
							let _URL = window.URL || window.webkitURL;
							let img = new Image(); /* global Image */
							img.src = _URL.createObjectURL(file);
							img.onload = function () {
								if (this.width > 5000 || this.height > 5000) {
									window.alert('Your images need to be less than 5000 pixels in height and width.'); // display alert
								} else {
									// valid image so upload to server
									// uploadImage will be your function to upload the image to the server or s3 bucket somewhere

									// place the now uploaded image in the editor where it was dropped
									const { schema } = view.state;
									const coordinates = view.posAtCoords({
										left: event.clientX,
										top: event.clientY
									});
									const node = schema.nodes.image.create({ src: img.src }); // creates the image element
									const transaction = view.state.tr.insert(coordinates!.pos, node); // places it in the correct position
									return view.dispatch(transaction);
								}
							};
							return true; // handled
						}
						return false; // not handled use default behaviour -->

<svelte:window bind:innerWidth={screenSize} on:click={(e) => (active = false)} />
<div class="bg-white w-1/2">
	<nav class="bg-[#D9D9D9] flex justify-between py-4 px-8 items-center">
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
					class={$editor?.isActive('bold') ? 'font-bold text-blue_office drop-shadow-md' : ''}
				>
					<i class="ri-bold text-lg" />
				</button>
				<button
					on:click={() => $editor?.chain().focus().toggleItalic().run()}
					disabled={!$editor?.can().chain().focus().toggleItalic().run()}
					class={$editor?.isActive('italic') ? 'font-bold text-blue_office drop-shadow-md' : ''}
				>
					<i class="ri-italic text-lg" />
				</button>
				<button
					on:click={() => $editor?.chain().focus().toggleStrike().run()}
					disabled={!$editor?.can().chain().focus().toggleStrike().run()}
					class={$editor?.isActive('strike') ? 'font-bold text-blue_office drop-shadow-md' : ''}
				>
					<i class="ri-strikethrough text-lg" />
				</button>
				<!-- <button
                    on:click={() => $editor?.chain().focus().toggleCode().run()}
                    disabled={!$editor?.can().chain().focus().toggleCode().run()}
                    class={$editor?.isActive('code') ? 'font-bold text-blue_office drop-shadow-md' : ''}
                >
                    <i class="ri-code-line text-lg" />
                    
                </button> -->
				<!-- <button on:click={() => $editor?.chain().focus().unsetAllMarks().run()}> clear marks </button>
                <button on:click={() => $editor?.chain().focus().clearNodes().run()}> clear nodes </button> -->

				<button
					on:click={() => $editor?.chain().focus().toggleBulletList().run()}
					class={$editor?.isActive('bulletList') ? 'font-bold text-blue_office drop-shadow-md' : ''}
				>
					<i class="ri-list-unordered text-lg" />
				</button>
				<button
					on:click={() => $editor?.chain().focus().toggleOrderedList().run()}
					class={$editor?.isActive('orderedList')
						? 'font-bold text-blue_office drop-shadow-md'
						: ''}
				>
					<i class="ri-list-ordered-2 text-lg" />
				</button>
				<button
					on:click={() => $editor?.chain().focus().toggleCodeBlock().run()}
					class={$editor?.isActive('codeBlock') ? 'font-bold text-blue_office drop-shadow-md' : ''}
				>
					<i class="ri-code-line text-lg" />
				</button>
				<button
					on:click={() => $editor?.chain().focus().toggleBlockquote().run()}
					class={$editor?.isActive('blockquote') ? 'font-bold text-blue_office drop-shadow-md' : ''}
				>
					<i class="ri-double-quotes-l text-lg" />
				</button>

				<button on:click={() => addYoutubeVideo()}>
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
				<!-- <button
					on:click={() => {
						updateStore();
						modalStore.trigger(modalDraft);
					}}
					class="btn font-semibold rounded-sm px-2 py-1 mr-2">Simpan draft</button
				> -->
				<button
					disabled={$editor?.isEmpty}
					on:click={() => {
						// updateStore();
						$editorJson = $editor.getJSON();
						postUpdate($currentPost.id, $editorJson, $userID, $userName);
						modalStore.close();
					}}
					class="btn bg-[#0093ED] text-white font-semibold rounded-sm px-2 py-1">Simpan</button
				>
			</div>
		</div>
	</nav>

	<div class="tipeditpost">
		<EditorContent editor={$editor} />
	</div>
</div>

<!-- {JSON.stringify($editor?.getJSON())} -->

<style>
	:global(.tipeditpost .tiptap) {
		padding: 5px;
		padding-top: 20px;
		min-height: 70vh;
		width: 90%;
		outline: none;
		margin: auto;
	}
	:global(.tipeditpost .tiptap h1) {
		font-size: 18px;
	}

	:global(.tipeditpost .tiptap p.is-editor-empty:first-child::before) {
		color: #adb5bd;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
	:global(.tipeditpost .tiptap .is-empty::before) {
		content: attr(data-placeholder);
		float: left;
		color: #ced4da;
		pointer-events: none;
		height: 0;
	}

	:global(.tipeditpost .tiptap pre) {
		background: #0d0d0d;
		color: #fff;
		font-family: 'JetBrainsMono', monospace;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
	}

	:global(.tipeditpost .tiptap pre code) {
		color: inherit;
		padding: 0;
		background: none;
		font-size: 0.8rem;
	}

	:global(.tipeditpost .tiptap code) {
		background: #cacaca;
		color: #616161;
	}

	:global(.tipeditpost .tiptap img) {
		max-width: 100%;
		height: auto;
	}

	:global(.tipeditpost .tiptap blockquote) {
		padding-left: 1rem;
		border-left: 2px solid rgba(#0d0d0d, 0.1);
	}

	:global(.tipeditpost .tiptap ul) {
		padding-left: 1rem;
		@apply list-disc;
	}
	:global(.tipeditpost .tiptap ol) {
		padding-left: 1rem;
		@apply list-decimal;
	}

	:global(.tipeditpost .tiptap h1) {
		@apply text-xl;
	}
	:global(.tipeditpost .tiptap h2) {
		@apply text-lg;
	}
	:global(.tipeditpost .tiptap h3) {
		@apply text-base;
	}

	:global(.tipeditpost .tiptap ul[data-type='taskList']) {
		list-style: none;
		padding: 0;
	}

	:global(.tipeditpost .tiptap ul[data-type='taskList']) {
		list-style: none;
		padding: 0;
	}

	:global(.tipeditpost .tiptap ul[data-type='taskList'] > li) {
		display: flex;
		align-items: center;
		@apply border-b-2 border-dotted pb-1 pt-1;
	}

	:global(.tipeditpost .tiptap ul[data-type='taskList'] > li > div) {
		word-break: break-all;
	}

	:global(.tipeditpost .tiptap ul[data-type='taskList'] > li > label) {
		flex: 0 0 auto;
		margin-right: 0.5rem;
		user-select: none;
	}

	:global(.tipeditpost .tiptap ul[data-type='taskList'] > li > label > div) {
		flex: 1 1 auto;
	}

	:global(.tipeditpost .tiptap ul[data-type='taskList'] > input[type='checkbox']) {
		cursor: pointer;
	}
	:global(
			.tipeditpost .tiptap ul[data-type='taskList'] > li > label > input[type='checkbox']:checked
		) {
		cursor: pointer;
		@apply bg-blue_office;
	}

	:global(.tipeditpost .tiptap .mention) {
		cursor: pointer;
		/* @apply bg-blue_office; */
		@apply border-blue_office text-blue_office;
		padding: 1px 4px;
		font-weight: 400;
		font-weight: 500;
		border-radius: 5px;
	}
	:global(.tipeditpost .tiptap .collaboration-cursor__caret) {
		border-left: 1px solid #0d0d0d;
		border-right: 1px solid #0d0d0d;
		margin-left: -1px;
		margin-right: -1px;
		pointer-events: none;
		position: relative;
		word-break: normal;
	}
	:global(.tipeditpost .tiptap .collaboration-cursor__label) {
		border-radius: 3px 3px 3px 0;
		color: #ffffff;
		font-size: 12px;
		font-style: normal;
		font-weight: 600;
		left: -1px;
		line-height: normal;
		padding: 0.1rem 0.3rem;
		position: absolute;
		top: -1.4em;
		user-select: none;
		white-space: nowrap;
	}
</style>
