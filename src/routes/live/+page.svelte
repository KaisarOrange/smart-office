<!-- <script>
	import { Peer } from 'peerjs';
	var peer = new Peer();

	let codeid = '';
	let youid = '';

	let videocurrent;
	let videoEl;

	peer.on('open', (id) => {
		youid = id;
	});

	peer.on('connection', (conn) => {
		console.log('message...');

		conn.on('data', (data) => {
			console.log('new data: ', data);
		});

		conn.on('open', () => {
			console.log('new message');
		});
	});

	peer.on('call', async (call) => {
		await navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				call.answer(stream);
				call.on('stream', renderYouwebCam);
				videocurrent.srcObject = stream;
				videocurrent.play();
			})
			.catch((err) => console.log(err));
	});

	let renderYouwebCam = (stream) => {
		console.log(stream);
		videoEl.srcObject = stream;
		videoEl.play();
	};
</script>

<div>
	youid: {youid}
	code: <input type="" bind:value={codeid} />

	<button
		on:click={async () => {
			var conn = peer.connect(codeid);
			conn.on('data', (data) => {});
			conn.on('open', () => {
				conn.send('hi');
			});

			await navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((stream) => {
					let call = peer.call(codeid, stream);
					videocurrent.srcObject = stream;
					videocurrent.play();

					call.on('stream', renderYouwebCam);
				})
				.catch((err) => console.log(err));
		}}>connect</button
	>

	<video bind:this={videoEl} width="400" height="400" autoplay>
		<track kind="captions" />
	</video>
	<br />
	<video bind:this={videocurrent} width="400" height="400" autoplay>
		<track kind="captions" />
	</video>
</div>

<!-- <script>
	import { onMount } from 'svelte';
	import VideoDisplay from './VideoDisplay.svelte';

	let videoDisplay;

	function connectStream() {
		let pc = new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:turn.localhost:8080'
				},
				{
					urls: 'turn:turn.localhost:8080',
					username: 'akhil',
					credential: 'akhil'
				}
			]
		});

		pc.ontrack = function (event) {
			console.log('first');
			const para = document.createElement('p');
			para.innerText = 'This is a paragraph';
			document.body.appendChild(para);
			if (event.track.kind === 'audio') {
				return;
			}

			let col = document.createElement('div');
			col.className = 'column is-6 peer';
			let el = document.createElement(event.track.kind);
			el.srcObject = event.streams[0];
			el.setAttribute('controls', 'true');
			el.setAttribute('autoplay', 'true');
			el.setAttribute('playsinline', 'true');
			let playAttempt = setInterval(() => {
				el.play()
					.then(() => {
						clearInterval(playAttempt);
					})
					.catch((error) => {
						console.log('unable to play the video, user has not interacted yet');
					});
			}, 3000);

			col.appendChild(el);
			document.getElementById('noonestream').style.display = 'none';
			document.getElementById('nocon').style.display = 'none';
			document.getElementById('videos').appendChild(col);

			event.track.onmute = function (event) {
				el.play();
			};

			event.streams[0].onremovetrack = ({ track }) => {
				if (el.parentNode) {
					el.parentNode.remove();
				}
				if (document.getElementById('videos').childElementCount <= 2) {
					document.getElementById('noonestream').style.display = 'flex';
				}
			};
		};

		let ws = new WebSocket(
			'ws://localhost:8080/room/d2aefced-128a-407d-9511-2d3d1d73d6cd/websocket'
		);
		pc.onicecandidate = (e) => {
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
			let pr = document.getElementById('videos');
			while (pr.childElementCount > 2) {
				pr.lastChild.remove();
			}
			document.getElementById('noonestream').style.display = 'none';
			document.getElementById('nocon').style.display = 'flex';
			setTimeout(function () {
				connectStream();
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
					console.log(candidate);

					pc.addIceCandidate(candidate);
			}
		};

		ws.onerror = function (evt) {
			console.log('error: ' + evt.data);
		};
	}

	//--------------------------------peer-----------------------------//

	function connect(stream) {
		document.getElementById('peers').style.display = 'block';
		document.getElementById('chat').style.display = 'flex';
		document.getElementById('noperm').style.display = 'none';
		let pc = new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:turn.localhost:8080'
				},
				{
					urls: 'turn:turn.localhost:8080',
					username: 'akhil',
					credential: 'akhil'
				}
			]
		});
		pc.ontrack = function (event) {
			console.log('first');
			if (event.track.kind === 'audio') {
				return;
			}

			const para = document.createElement('p');
			para.innerText = 'This is a paragraph';
			document.body.appendChild(para);

			let col = document.createElement('div');
			col.className = 'column is-6 peer';
			let el = document.createElement(event.track.kind);
			el.srcObject = event.streams[0];
			el.setAttribute('controls', 'true');
			el.setAttribute('autoplay', 'true');
			el.setAttribute('playsinline', 'true');
			col.appendChild(el);

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
			'ws://localhost:8080/room/d2aefced-128a-407d-9511-2d3d1d73d6cd/websocket'
		);
		pc.onicecandidate = (e) => {
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
			let pr = document.getElementById('videos');
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
		connectStream();

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
				videoDisplay.srcObject = stream;
				connect(stream);
			})
			.catch((err) => console.log(err));
	});
</script>

<section class="hero is-medium is-link">
	<div class="hero-body">
		<h1 class="title">That is simple.</h1>
		<p class="subtitle">to talk with your friends, just click "Create Room".</p>

		<div class="buttons">
			<a href="/room/create" class="button is-light">
				<strong>Create Room</strong>
			</a>
		</div>
	</div>
</section>

<div class="viewer">
	<p class="icon-users" id="viewer-count" />
</div>

<div id="peers">
	<div class="columns is-multiline" id="videos">
		<VideoDisplay bind:videoDisplay />
		<div id="noonestream" class="column notif">
			<article class="notification is-primary is-light">
				Hey! <br />
				No streamer in the room. <br />
				Please wait for the streamer.
			</article>
		</div>
		<div id="nocon" class="column notif">
			<article class="notification is-danger">
				Connection is closed! <br />
				Please refresh the page.
			</article>
		</div>
	</div>
</div> --> -->
