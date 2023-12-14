<script lang="ts">
	import { generateHTML } from '@tiptap/html';
	import '../../app.postcss';
	import StarterKit from '@tiptap/starter-kit';
	import Youtube from '@tiptap/extension-youtube';
	import CharacterCount from '@tiptap/extension-character-count';
	import Placeholder from '@tiptap/extension-placeholder';
	import Image from '@tiptap/extension-image';
	import { getContext } from 'svelte';

	export let konten: any;

	let clickedLanjut: any = getContext('clicked');
	console.log($clickedLanjut);
</script>

<!-- <button on:click={() => (clicked = !clicked)}>test</button> -->

<div class=" {$clickedLanjut ? '' : 'overflow-hidden max-h-[28rem] text-ellipsis '}">
	{@html generateHTML(konten, [Youtube, StarterKit, Image])}
</div>
