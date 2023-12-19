<script lang="ts">
	export let message: any;
</script>

<div class="flex gap-2 rounded-md bg-white p-2 mx-2 mb-2">
	<img class="w-8 h-8 object-cover rounded-full" src="/alif.png" alt="profile_picture" />
	<div class="text-sm">
		<div class="flex gap-1 items-center">
			<p class="font-semibold">user x mengundang anda masuk ke ruang y</p>
		</div>

		<div class="flex justify-end items-center gap-2">
			<div
				class="flex items-center gap-0.5 btn hover:bg-green-200 mt-2 rounded-sm py-0.5 px-2 cursor-pointer select-none"
			>
				<i class="ri-checkbox-circle-fill text-2xl text-green-600" /> Terima
			</div>
			<div
				class="flex items-center gap-0.5 btn hover:bg-red-200 mt-2 rounded-sm py-0.5 px-2 cursor-pointer select-none"
			>
				<i class="ri-close-circle-fill text-2xl text-red-600" />Tolak
			</div>
		</div>
	</div>
</div>
