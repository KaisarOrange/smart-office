<script lang="ts">
	import { generateHTML } from '@tiptap/html';
	import '../../app.postcss';
	import StarterKit from '@tiptap/starter-kit';
	import Youtube from '@tiptap/extension-youtube';
	import CharacterCount from '@tiptap/extension-character-count';
	import Placeholder from '@tiptap/extension-placeholder';
	import Image from '@tiptap/extension-image';

	export let konten: any;

	export let clicked = false;
</script>

<!-- <button on:click={() => (clicked = !clicked)}>test</button> -->

<div class=" {clicked ? '' : 'overflow-hidden max-h-[28rem] text-ellipsis '}">
	{@html generateHTML(konten, [Youtube, StarterKit, Image])}
</div>
