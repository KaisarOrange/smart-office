<script>
	export let videoDisplay;
</script>

<div class="column is-6 peer">
	<video id="localVideo" bind:this={videoDisplay} class="video-area mirror" autoplay muted />
</div>
