<script lang="ts">
	import Notification from './Notification.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	export let data: any;

	let clicked: boolean = false;
</script>

<svelte:window on:click={(e) => (clicked = false)} />

<div class="flex justify-center items-center gap-3 rounded-sm">
	<div class="font-semibold flex items-center gap-1">
		<div
			class="font-semibold select-none cursor-pointer flex items-center justify-center gap-2"
			on:click|stopPropagation={() => {
				clicked = !clicked;
			}}
			on:keydown={() => {}}
			aria-hidden
		>
			<Avatar class="select-none cursor-pointer" src={data.photo_url} width={'w-12'} />
		</div>
		Hi, {data.user_name}!
		<div class="{clicked ? 'visible' : 'invisible'} absolute top-20 bg-grey_office p-1 rounded-sm">
			<div class="bg-white p-1 select-none cursor-pointer hover:bg-gray-100 rounded-sm">
				<form action="/beranda?/logout" method="POST">
					<button type="submit">
						Log out <i class="ri-logout-box-line" />
					</button>
				</form>
			</div>
		</div>
	</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		style="background-image: url(/message.svg);"
		class="relative block w-6 h-6 bg-contain select-none cursor-pointer"
		on:click={() => goto('/beranda/message')}
	>
		<span
			class="absolute text-xs text-white font-bold bottom-3 left-3 bg-[#0093ED] rounded-full px-1"
			>2</span
		>
	</div>

	<Notification />
</div>
