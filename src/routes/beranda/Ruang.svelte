<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { currentRuang, userID } from '$lib/Stores/editorOutput';
	import { Avatar, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	import { env } from '$env/dynamic/public';

	export let data: any;
	let clicked: boolean;

	const createRuang = async (name: any) => {
		// const konten: any = get(editorJson);
		if (name != '') {
			const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/ruang`, {
				method: 'POST',
				body: JSON.stringify({
					name,
					user_id: $userID
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const respon = await res.json();
			if (res.ok) {
				goto(`/beranda/ruang/${respon.data.id}`, { invalidateAll: true });

				$currentRuang = respon.data.name;
			}
		}
		return;
	};

	const modal: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Buat Ruang Baru',
		body: 'Tambahkan nama ruang yang anda inginkan.',
		// Populates the input value and attributes
		value: '',
		valueAttr: { type: 'text', minlength: 3, maxlength: 55, required: true },
		// Returns the updated response value
		response: (r: string) => createRuang(r)
	};

	const modalStore = getModalStore();
</script>

<svelte:window on:click={(e) => (clicked = false)} />

<div
	on:click|stopPropagation={() => {}}
	on:keydown
	aria-hidden
	class="flex justify-center items-center gap-2"
>
	<div class="flex flex-col">
		<div
			class="font-semibold select-none cursor-pointer flex items-center justify-center gap-2"
			on:click|stopPropagation={() => {
				clicked = !clicked;
			}}
			on:keydown={() => {}}
			aria-hidden
		>
			<Avatar width={'w-12'} />
			<div class="">{$currentRuang}</div>
			<img src="/down.png" class="w-2 h-2" alt="" />
		</div>
		<div
			class="{clicked
				? 'clicked'
				: 'clickedHid '} bg-[#D9D9D9] absolute top-20 h-[250px] py-4 px-5 flex flex-col gap-3 rounded-sm overflow-scroll overflow-x-hidden"
		>
			<button
				on:click={() => {
					modalStore.trigger(modal);
				}}
				class="bg-[#0093ED] hover:bg-[#51abef] active:bg-[#3d88b6] text-white font-semibold px-2 py-1 rounded-md"
				>Ruang +</button
			>
			{#each data as { name, id }}
				<div
					on:keydown={() => {}}
					aria-hidden
					on:click={() => {
						goto(`/beranda/ruang/${id}`);
						$currentRuang = name;
					}}
					class="flex cursor-pointer items-center gap-2 hover:bg-gray-100 bg-white px-1.5 rounded-md py-1"
				>
					<Avatar width="w-10" />
					<div class="font-semibold cursor-pointer">
						{name}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.clicked {
		visibility: visible;
	}
	.clickedHid {
		visibility: hidden;
	}
</style>
