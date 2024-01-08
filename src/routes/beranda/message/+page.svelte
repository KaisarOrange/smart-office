<script>
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	let users = ['joan', 'alif', 'bobby', 'dwi'];
	let messages = [];
	let message = '';
	let selected = 0;

	const socket = new WebSocket(`ws://${env.PUBLIC_WS_URL}/ws/room`);

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		messages = [...messages, data];
	};

	const sendMessage = () => {
		const data = { text: message };
		socket.send(JSON.stringify(data));
		console.log(data);
		message = '';
	};

	onMount(() => {
		socket.onopen = () => {
			console.log('WebSocket connection opened');
		};

		socket.onclose = (event) => {
			console.log('WebSocket connection closed:', event);
		};

		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};
	});
</script>

<div class="w-2/3 flex mt-44 flex-col m-auto">
	<div class="flex gap-2">
		<div class="bg-grey_office p-1 flex-1">
			<ul class="">
				{#each users as user, i}
					<div
						on:keydown={() => {}}
						aria-hidden
						on:click={() => (selected = i)}
						class="bg-white p-4 font-semibold h-full mt-2 mx-3 rounded-sm"
					>
						<li>@{user}</li>
					</div>
				{/each}
			</ul>
		</div>
		<div class=" bg-grey_office flex flex-col w-2/3 h-[350px] m-auto p-4">
			<div class="w-full bg-white p-2 roundedsm font-semibold">@{users[selected]}</div>
			<div class="">
				<ul>
					{#each messages as { text }, index (index)}
						<div class="bg-white p-6 rounded-sm mt-3">
							<li key={index}>{text}</li>
						</div>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<div class="flex justify-end mt-4">
		<input
			class="w-full"
			bind:value={message}
			on:input={() => {}}
			on:keyup={(e) => e.key === 'Enter' && sendMessage()}
		/>
		<button class="bg-blue_office text-white font-semibold px-2" on:click={sendMessage}
			>Kirim</button
		>
	</div>
</div>
