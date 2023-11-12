<script lang="ts">
	import Notification from './Notification.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	export let data: any;
	console.log('first', data);
</script>

<div class="flex justify-center items-center gap-3">
	<div class="font-semibold flex items-center gap-1">
		<Avatar class="select-none cursor-pointer" src={data.photo_url} width={'w-12'} />
		Hi, {data.user_name}!
	</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		style="background-image: url(/message.svg);"
		class="relative block w-6 h-6 bg-contain select-none cursor-pointer"
		on:click={() => goto('/message')}
	>
		<span
			class="absolute text-xs text-white font-bold bottom-3 left-3 bg-[#0093ED] rounded-full px-1"
			>2</span
		>
	</div>

	<Notification />
</div>
