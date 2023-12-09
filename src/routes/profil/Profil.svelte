<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: any;
	export let selected: number;
	console.log(data);
</script>

<div class="bg-[#D9D9D9] bg min-h-[400px] flex flex-col rounded-sm w-60 h-fit">
	<div class="w-full h-28 bg-blue_office" />
	<div class="relative left-[75px] bottom-12">
		<Avatar src={data.photo_url} width={'w-24'} />
		<div class="ml-2 font-semibold">@{data.user_name}</div>
	</div>
	<div class="mx-4">
		<div
			on:click={() => (selected = 0)}
			on:keydown={() => {}}
			aria-hidden
			class="{selected === 0
				? 'text-[#0093ED] font-semibold'
				: ''}  my-1 w-fit text-lg select-none cursor-pointer"
		>
			<i class="ri-article-line" />
			Posts
			<div class="bg-blue-400 {selected === 0 ? 'h-0.5' : ''}" />
		</div>
		<div
			on:click={() => (selected = 1)}
			on:keydown={() => {}}
			aria-hidden
			class="{selected === 1
				? 'text-[#0093ED] font-semibold'
				: ''} my-1 w-fit text-lg select-none cursor-pointer"
		>
			<i class="ri-draft-line" /> Draft
			<div class="bg-blue-400 {selected === 1 ? 'h-0.5' : ''}" />
		</div>
		<div
			on:click={() => (selected = 2)}
			on:keydown={() => {}}
			aria-hidden
			class="{selected === 2
				? 'text-[#0093ED] font-semibold'
				: ''} select-none cursor-pointer my-1 w-fit text-lg"
		>
			<i class="ri-heart-line" /> Disukai
			<div class="bg-blue-400 {selected === 2 ? 'h-0.5' : ''}" />
		</div>
		<div
			on:click={() => (selected = 3)}
			on:keydown={() => {}}
			aria-hidden
			class="{selected === 3
				? 'text-[#0093ED] font-semibold'
				: ''}select-none cursor-pointer my-1 w-fit text-lg"
		>
			<i class="ri-star-line" /> Tersimpan
			<div class="bg-blue-400 {selected === 3 ? 'h-0.5' : ''}" />
		</div>
	</div>
</div>
