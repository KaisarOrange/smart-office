<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { currentRuang } from './Stores/editorOutput';
	import { goto } from '$app/navigation';

	let anggotas: Number[] = [0, 1, 2];
	export let data: any;
	export let ruangId: any;
	const modalStore = getModalStore();
</script>

<div>
	<div class="p-2 bg-[#D9D9D9] rounded-sm w-60 h-fit">
		<div class="flex justify-between px-2">
			<p class="text-[#0093ED] font-bold">Anggota</p>
			<button
				on:click={() => {
					modalStore.trigger({
						type: 'component',
						component: 'modalInsertUser',
						// Data
						title: 'Unggah',
						body: 'Pilih ruang untuk menyimpan:',
						meta: { ruang: ruangId }
						// TRUE if confirm pressed, FALSE if cancel pressed
						// response: (r: boolean) => {
						// 	postPosts($editor?.getJSON());
						// }
					});
				}}
				class="btn bg-[#0093ED] text-white font-semibold rounded-md py-0.5 px-2">Undang</button
			>
		</div>

		{#each data as { name, photo_url, email, user_name }}
			<div class="flex gap-2 p-2 bg-white mx-2 my-3 rounded-md">
				<img class="w-8 h-8 object-cover rounded-full" src={photo_url} alt="profile_picture" />
				<div class="text-sm">
					<p class="font-semibold">{user_name}</p>
					<p class="text-xs">{email}</p>
				</div>
			</div>
		{/each}
	</div>
	<div class="mt-6 bg-grey_office p-2 flex gap-2 items-center justify-center">
		<i class="ri-video-chat-line text-2xl text-blue_office" />
		<p class="font-semibold">Ruang panggilan</p>
		<button
			on:click={() => goto('/beranda/live')}
			class="bg-blue_office text-white font-semibold px-1.5 py-0.5 rounded-sm text-sm">Masuk</button
		>
	</div>
</div>
