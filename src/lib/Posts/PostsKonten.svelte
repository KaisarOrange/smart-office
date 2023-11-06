<script lang="ts">
	import { generateHTML } from '@tiptap/html';
	import '../../app.postcss';
	import StarterKit from '@tiptap/starter-kit';
	import Youtube from '@tiptap/extension-youtube';
	import CharacterCount from '@tiptap/extension-character-count';
	import Placeholder from '@tiptap/extension-placeholder';
	import Image from '@tiptap/extension-image';

	export let konten: any;
</script>

<div>
	{@html generateHTML(konten, [Youtube, StarterKit])}
</div>
