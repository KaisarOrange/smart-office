<script>
	export let video;
</script>

<div class="column is-6 peer">
	<video id="localVideo" bind:this={video} class="video-area mirror" autoplay muted />
</div>
