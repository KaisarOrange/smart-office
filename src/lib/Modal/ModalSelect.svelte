<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { editorJson, userID, userName } from '$lib/Stores/editorOutput';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { Avatar, ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
	import { postPosts } from '$lib/functions/postPosts';
	import { fade } from 'svelte/transition';
	import { postSendMentionNotif } from '$lib/functions/postSendMentionNotif';
	import { Datepicker } from 'flowbite-svelte';
	import TaskItem from '@tiptap/extension-task-item';

	export let parent: SvelteComponent;

	// Local
	let roomId = '';
	let privatee: boolean = false;
	let selectedDate = '';
	let date = new Date();

	let reminder: boolean = false;

	let timeHour = date.getHours();
	let timeMinute = date.getMinutes();
	let time = `${timeHour}:${timeMinute}`;

	let selectedTime = time;
	console.log(time);

	//REMINDER
	let mentionedUser: string[] = [];
	const filterMentionTypeDoc = $editorJson.content?.filter((e: any) => e.type === 'taskList');
	filterMentionTypeDoc?.forEach((e: any) =>
		e.content?.forEach((e: any) => {
			e.content?.forEach((e: any) => {
				e.content?.forEach((e: any) => {
					console.log(e);
					if (e.type === 'mention') {
						mentionedUser = [...mentionedUser, e.attrs!.id];
					}
				});
			});
		})
	);

	const modalStore = getModalStore();

	const roomsList = $modalStore[0].meta.ruang;
	function onFormSubmit(): void {
		//Get Mentioned Users

		const konten: any = $editorJson;
		const ruangId: string = roomId;
		postPosts(ruangId, false, konten, privatee, $userID, $userName, date, reminder);

		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cListButton = 'bg-blue_office overflow-hidden';

	function handleDateChange(event: any) {
		const [hour, minute] = selectedTime.split(':');
		const [year, month, day] = selectedDate.split('-');
		date = new Date(selectedDate);

		date.setHours(parseInt(hour));
		date.setMinutes(parseInt(minute));
	}
</script>

<button
	on:click={() => {
		console.log(date.toISOString());
	}}
	class="btn bg-blue-300">hello</button
>
{#if $modalStore[0]}
	<div class="modal-example-form {cBase} ">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<SlideToggle
			on:click={() => {
				roomId = '';
			}}
			active={'bg-blue_office'}
			size="sm"
			name="slider-label"
			bind:checked={privatee}>{privatee ? 'private' : 'public'}</SlideToggle
		>

		{#if !privatee}
			<div transition:fade={{ duration: 200 }}>
				<ListBox
					class="border border-surface-500 p-3 rounded-container-token overflow-x-hidden  h-48 overflow-scroll"
				>
					{#each roomsList as { name, id }}
						<ListBoxItem
							class={roomId === id ? cListButton : 'overflow-hidden'}
							bind:group={roomId}
							{name}
							value={id}
						>
							<div class="flex items-center gap-3">
								<Avatar width={'w-9'} />
								{name}
							</div>
						</ListBoxItem>
					{/each}
				</ListBox>
			</div>
		{/if}

		<div>
			<div class="flex items-center mb-2 gap-2 select-none">
				<!-- <SlideToggle
					active={'bg-blue_office'}
					size="sm"
					name="slider-label"
					bind:checked={reminder}
				/> -->
				<div class="flex items-center gap-1">
					<div class="font-semibold">pengingat</div>
					<div
						on:keydown={() => {}}
						aria-hidden
						on:click={() => {
							reminder = !reminder;
							if (reminder === true) {
								selectedDate = '';
								// selectedTime = '';
							}
						}}
					>
						{#if !reminder}
							<i class="ri-add-fill cursor-pointer text-blue_office font-semibold" />
						{:else}
							<i class="ri-subtract-fill cursor-pointer text-blue_office font-semibold" />
						{/if}
					</div>
				</div>
			</div>
			{#if reminder}
				<div transition:fade={{ duration: 200 }}>
					<input
						class="rounded-lg"
						type="date"
						bind:value={selectedDate}
						on:change={handleDateChange}
					/>
					<input
						class="rounded-lg"
						type="time"
						bind:value={selectedTime}
						on:change={handleDateChange}
					/>
				</div>
			{/if}
		</div>

		<div class="font-semibold">
			Izinkan pengguna untuk mengubah unggahan <i
				class="ri-add-fill text-blue_office font-semibold cursor-pointer"
			/>
		</div>
		<div class="flex gap-1 flex-wrap">
			{#each mentionedUser as user}
				<div class="bg-blue_office text-white font-semibold p-1 rounded-sm text-sm">
					@{user}
					<span class="relative bottom-1 cursor-pointer"
						><i class="ri-close-fill text-red-500" /></span
					>
				</div>
			{/each}
		</div>
		<!-- prettier-ignore -->

		<footer class="modal-footer {parent.regionFooter}">
			<button
				class="btn {parent.buttonNeutral} bg-transparent border border-black"
				on:click={parent.onClose}>{parent.buttonTextCancel}</button
			>
			<button disabled={roomId === "" && privatee != true || reminder === true && selectedDate === "" } class="btn {parent.buttonPositive} text-white" on:click={onFormSubmit}>Unggah</button>
		</footer>
	</div>
{/if}
