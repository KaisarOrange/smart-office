<script>
	// @ts-nocheck

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

<div class="">
	<video id="localVideo" use:srcObject={video} class="rounded-sm" autoplay muted />
</div>
