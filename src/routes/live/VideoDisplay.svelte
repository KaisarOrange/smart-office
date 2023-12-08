<script>
	export let video;

	function srcObject(node, video) {
		node.srcObject = video;
		return {
			update(newStream) {
				if (node.srcObject != newStream) {
					node.srcObject = newStream;
				}
			}
		};
	}
</script>

<div class="column is-6 peer">
	<video id="localVideo" use:srcObject={video} class="video-area mirror" autoplay muted />
</div>
