<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: any;
</script>

<div class="bg-[#D9D9D9] bg min-h-[400px] flex flex-col rounded-sm w-60 h-fit">
	<div class="w-full h-28 bg-blue_office" />
	<div class="relative left-[75px] bottom-12">
		<Avatar src={data.photo_url} width={'w-24'} />
		<div class="ml-2 font-semibold">@{data.user_name}</div>
	</div>
	<div class="mx-4">
		<div class="my-1 text-lg"><i class="ri-draft-line" /> Draft</div>
		<div class="my-1 text-lg"><i class="ri-heart-line" /> Disukai</div>
		<div class="my-1 text-lg"><i class="ri-star-line" /> Tersimpan</div>
	</div>
</div>
