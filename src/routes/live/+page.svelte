<script>
	import { onMount } from 'svelte';

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

			let col = document.createElement('div');
			let el = document.createElement(event.track.kind);
			el.srcObject = event.streams[0];
			el.setAttribute('controls', 'true');
			el.setAttribute('autoplay', 'true');
			el.setAttribute('playsinline', 'true');
			el.setAttribute('muted', 'true');

			col.appendChild(el);
			document.getElementById('noone').style.display = 'none';
			document.getElementById('nocon').style.display = 'none';
			document.getElementById('videos').appendChild(col);

			event.track.onmute = function (event) {
				el.play();
			};

			event.streams[0].onremovetrack = ({ track }) => {
				if (el.parentNode) {
					el.parentNode.remove();
				}
				if (document.getElementById('videos').childElementCount <= 3) {
					document.getElementById('noone').style.display = 'grid';
					document.getElementById('noonein').style.display = 'grid';
				}
			};
		};

		stream.getTracks().forEach((track) => pc.addTrack(track, stream));

		let ws = new WebSocket(
			'ws://127.0.0.1:8081/room/ee2f3861-5997-4d52-b48d-b35ed5481a18/websocket'
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
			document.getElementById('noone').style.display = 'none';
			document.getElementById('nocon').style.display = 'flex';
			setTimeout(function () {
				connect(stream);
			}, 1000);
		};

		ws.onmessage = function (evt) {
			let msg = JSON.parse(evt.data);
			console.log('geyyyy');
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
				document.getElementById('localVideo').srcObject = stream;
				connect(stream);
			})
			.catch((err) => console.log(err));
	});
</script>

<div class="viewer">
	<p class="icon-users" id="viewer-count" />
</div>

<div id="noperm" class="columns">
	<div class="column notif">
		<article class="notification is-link">
			Camera and microphone permissions are needed to join the room. <br />
			Otherwise, you can join the <a href=" .StreamLink "><strong>stream</strong></a> as viewer.
		</article>
	</div>
</div>

<div id="peers">
	<div class="columns is-multiline flex gap-4" id="videos">
		<div class="column is-6 peer">
			<video id="localVideo" class="video-area mirror" autoplay muted />
		</div>
		<div id="noone" class="column is-6 notif">
			<article id="noonein" class="notification is-primary is-light">
				<button class="delete" />
				No other streamer is in the room. <br />
				Share your room link to invite your friends.
			</article>
			<article class="notification is-primary is-light">
				<button class="delete" />
				Share your stream link with your viewers.
			</article>
		</div>
		<div id="nocon" class="column is-6 notif">
			<article class="notification is-danger">
				Connection is closed!<br />
				Please refresh the page.
			</article>
		</div>
	</div>
</div>
