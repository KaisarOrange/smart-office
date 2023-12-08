<script>
	import { onMount } from 'svelte';
	import VideoDisplay from './VideoDisplay.svelte';
	let videos;
	let videosPeers = [];
	let test = [0, 1, 2, 3];

	const removeTest = () => {
		videosPeers = videosPeers.splice(1);
	};

	function connect(stream) {
		let pc = new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:turn.videochat:3478'
				},
				{
					urls: 'turn:turn.videochat:3478',
					username: 'akhil',
					credential: 'akhil'
				}
			]
		});
		pc.ontrack = function (event) {
			if (event.track.kind === 'audio') {
				return;
			}

			// videosPeers = event.streams[0];
			console.log(event.track.id);
			videosPeers = [...videosPeers, { id: event.track.id, stream: event.streams[0] }];

			// document.getElementById('videos').appendChild(col);

			event.track.onmute = function (event) {
				// el.play();
			};

			event.streams[0].onremovetrack = ({ track }) => {
				videosPeers = videosPeers.filter((e) => e.id != track.id);
				// if (el.parentNode) {
				// 	el.parentNode.remove();
				// }
				// if (document.getElementById('videos').childElementCount <= 3) {
				// 	document.getElementById('noone').style.display = 'grid';
				// 	document.getElementById('noonein').style.display = 'grid';
				// }
			};
		};

		stream.getTracks().forEach((track) => pc.addTrack(track, stream));

		let ws = new WebSocket(
			'ws://192.168.100.35:8081/room/ee2f3861-5997-4d52-b48d-b35ed5481a18/websocket'
		);
		pc.onicecandidate = (e) => {
			console.log(e);
			if (!e.candidate) {
				return;
			}

			ws.send(
				JSON.stringify({
					event: 'candidate',
					data: JSON.stringify(e.candidate)
				})
			);
		};

		ws.addEventListener('error', function (event) {
			console.log('error: ', event);
		});

		ws.onclose = function (evt) {
			console.log('websocket has closed');
			pc.close();
			pc = null;
			pr = document.getElementById('videos');
			while (pr.childElementCount > 3) {
				pr.lastChild.remove();
			}
			// document.getElementById('noone').style.display = 'none';
			// document.getElementById('nocon').style.display = 'flex';
			setTimeout(function () {
				connect(stream);
			}, 1000);
		};

		ws.onmessage = function (evt) {
			let msg = JSON.parse(evt.data);
			if (!msg) {
				return console.log('failed to parse msg');
			}

			switch (msg.event) {
				case 'offer':
					let offer = JSON.parse(msg.data);
					if (!offer) {
						return console.log('failed to parse answer');
					}
					pc.setRemoteDescription(offer);
					pc.createAnswer().then((answer) => {
						pc.setLocalDescription(answer);
						ws.send(
							JSON.stringify({
								event: 'answer',
								data: JSON.stringify(answer)
							})
						);
					});
					return;

				case 'candidate':
					let candidate = JSON.parse(msg.data);
					if (!candidate) {
						return console.log('failed to parse candidate');
					}

					pc.addIceCandidate(candidate);
			}
		};

		ws.onerror = function (evt) {
			console.log('error: ' + evt.data);
		};
	}

	onMount(() => {
		navigator.mediaDevices
			.getUserMedia({
				video: {
					width: {
						max: 1280
					},
					height: {
						max: 720
					},
					aspectRatio: 4 / 3,
					frameRate: 30
				},
				audio: {
					sampleSize: 16,
					channelCount: 2,
					echoCancellation: true
				}
			})
			.then((stream) => {
				videos = stream;
				connect(stream);
			})
			.catch((err) => console.log(err));
	});
</script>

<div class="viewer">
	<p class="icon-users" id="viewer-count" />
</div>

<div class="" id="videos">
	<div class="flex justify-center items-center m-auto">
		<VideoDisplay video={videos} />

		{#each videosPeers as video (video.id)}
			<VideoDisplay video={video.stream} />
		{/each}
	</div>
</div>
