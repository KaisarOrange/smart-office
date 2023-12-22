<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import suggestion from './suggestion';
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createEditor, Editor, EditorContent, SvelteRenderer } from 'svelte-tiptap';
	import Paragraph from '@tiptap/extension-paragraph';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import TextAlign from '@tiptap/extension-text-align';
	import StarterKit from '@tiptap/starter-kit';
	import Youtube from '@tiptap/extension-youtube';
	import CharacterCount from '@tiptap/extension-character-count';
	import Mention from '@tiptap/extension-mention';
	import Placeholder from '@tiptap/extension-placeholder';
	import Image from '@tiptap/extension-image';
	import Document from '@tiptap/extension-document';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import { currentRuang, editorJson, userID } from '$lib/Stores/editorOutput';
	import { postPosts } from '$lib/functions/postPosts';

	let active: boolean = false;
	let editor: Readable<Editor>;

	export let data;
	let ruanglist: any = [];
	let userId = '';
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

	const modalStore = getModalStore();

	let modalDraft: ModalSettings = {
		type: 'confirm',
		title: 'Draft',
		body: 'Simpan sebagai draft?',
		// meta: { ruang: ruanglist },
		response: (r: boolean) => {
			const konten: any = $editorJson;

			if (r === true) {
				postPosts(userId, true, konten, true, $userID);
				return;
			}
		}
	};

	onMount(() => {
		data.stream?.users.then((res: any) => {
			ruanglist = res.data.ruang;
			userId = res.data.id;
		});

		editor = createEditor({
			extensions: [
				CustomDocument,
				CharacterCount,
				TaskList,
				TaskItem,
				Youtube,
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
						console.log();
						const { schema } = view.state;
						const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
						const node = schema.nodes.image.create({
							src: 'https://source.unsplash.com/3tYZjGSBwbk'
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
			}
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

<nav class="bg-[#D9D9D9] flex justify-between py-4 px-8 items-center fixed top-0 w-full z-10">
	<a
		on:click={() => {
			$currentRuang = 'Ruang';
		}}
		class="font-extrabold text-lg"
		href="/beranda"><span class="text-[#0093ED]">SMART</span> OFFICE</a
	>

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
				class="{active ? '' : 'hidden'} absolute top-[68px] bg-[#D9D9D9] p-1 rounded-sm mt-2"
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
				on:click={() => $editor?.chain().focus().toggleTaskList().run()}
				disabled={!$editor?.can().chain().focus().toggleTaskList().run()}
				class={$editor?.isActive('taskList') ? 'font-bold text-blue_office drop-shadow-md' : ''}
			>
				btn
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
				on:click={() => $editor?.chain().focus().setTextAlign('left').run()}
				class={$editor?.isActive({ textAlign: 'left' })
					? 'font-bold text-blue_office drop-shadow-md'
					: ''}
			>
				<i class="ri-align-left text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().setTextAlign('right').run()}
				class={$editor?.isActive({ textAlign: 'right' })
					? 'font-bold text-blue_office drop-shadow-md'
					: ''}
			>
				<i class="ri-align-right text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().setTextAlign('justify').run()}
				class={$editor?.isActive({ textAlign: 'justify' })
					? 'font-bold text-blue_office drop-shadow-md'
					: ''}
			>
				<i class="ri-align-center text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().setTextAlign('center').run()}
				class={$editor?.isActive({ textAlign: 'center' })
					? 'font-bold text-blue_office drop-shadow-md'
					: ''}
			>
				<i class="ri-align-justify text-lg" />
			</button>
			<button
				on:click={() => $editor?.chain().focus().toggleBulletList().run()}
				class={$editor?.isActive('bulletList') ? 'font-bold text-blue_office drop-shadow-md' : ''}
			>
				<i class="ri-list-unordered text-lg" />
			</button>

			<button
				on:click={() => $editor?.chain().focus().toggleOrderedList().run()}
				class={$editor?.isActive('orderedList') ? 'font-bold text-blue_office drop-shadow-md' : ''}
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
		<button
			disabled={$editor?.isEmpty}
			on:click={() => {
				modalStore.trigger(modalDraft);
			}}
			class="btn font-semibold rounded-sm px-2 py-1 mr-2">Simpan draft</button
		>
		<button
			disabled={$editor?.isEmpty}
			on:click={() => {
				modalStore.trigger({
					type: 'component',
					component: 'modalComponentOne',
					// Data
					title: 'Unggah',
					body: 'Pilih ruang untuk menyimpan:',
					meta: { ruang: ruanglist }
					// TRUE if confirm pressed, FALSE if cancel pressed
					// response: (r: boolean) => {
					// 	postPosts($editor?.getJSON());
					// }
				});
			}}
			class="btn bg-[#0093ED] text-white font-semibold rounded-sm px-2 py-1">Unggah</button
		>
	</div>
</nav>

<div class="tipedit mt-24">
	<div id="template" style="display: none;">
		<strong>Bolded content</strong>
	</div>
	<EditorContent editor={$editor} />
</div>

<!-- {JSON.stringify($editor?.getJSON())} -->

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

	:global(.tipedit .tiptap pre) {
		background: #0d0d0d;
		color: #fff;
		font-family: 'JetBrainsMono', monospace;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
	}

	:global(.tipedit .tiptap pre code) {
		color: inherit;
		padding: 0;
		background: none;
		font-size: 0.8rem;
	}

	:global(.tipedit .tiptap code) {
		background: #cacaca;
		color: #616161;
	}

	:global(.tipedit .tiptap img) {
		max-width: 100%;
		height: auto;
	}

	:global(.tipedit .tiptap blockquote) {
		padding-left: 1rem;
		border-left: 2px solid rgba(#0d0d0d, 0.1);
	}

	:global(.tipedit .tiptap ul) {
		padding-left: 1rem;
		@apply list-disc;
	}
	:global(.tipedit .tiptap ol) {
		padding-left: 1rem;
		@apply list-decimal;
	}

	:global(.tipedit .tiptap h1) {
		@apply text-xl;
	}
	:global(.tipedit .tiptap h2) {
		@apply text-lg;
	}
	:global(.tipedit .tiptap h3) {
		@apply text-base;
	}

	:global(.tipedit .tiptap ul[data-type='taskList']) {
		list-style: none;
		padding: 0;
	}

	:global(.tipedit .tiptap ul[data-type='taskList']) {
		list-style: none;
		padding: 0;
	}

	:global(.tipedit .tiptap ul[data-type='taskList'] > li) {
		display: flex;
		align-items: center;
	}

	:global(.tipedit .tiptap ul[data-type='taskList'] > li > label) {
		flex: 0 0 auto;
		margin-right: 0.5rem;
		user-select: none;
	}

	:global(.tipedit .tiptap ul[data-type='taskList'] > li > label > div) {
		flex: 1 1 auto;
	}

	:global(.tipedit .tiptap ul[data-type='taskList'] > input[type='checkbox']) {
		cursor: pointer;
	}
</style>
