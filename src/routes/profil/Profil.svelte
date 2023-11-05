<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	let anggotas: Number[] = [0, 1, 2];
</script>

<div class="bg-[#D9D9D9] bg min-h-[400px] flex flex-col rounded-sm w-60 h-fit">
	<div class="w-full h-28 bg-blue_office" />
	<div class="relative left-[75px] bottom-12">
		<Avatar src={'/alif.png'} width={'w-24'} />
		<div class="ml-2 font-semibold">Alif Ayodya</div>
	</div>
	<div class="mx-4">
		<div class="my-1 text-lg"><i class="ri-draft-line" /> Draft</div>
		<div class="my-1 text-lg"><i class="ri-heart-line" /> Disukai</div>
		<div class="my-1 text-lg"><i class="ri-star-line" /> Tersimpan</div>
	</div>
</div>
