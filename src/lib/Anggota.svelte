<script lang="ts">
	let anggotas: Number[] = [0, 1, 2];
	export let data: any;
</script>

<div class="p-2 bg-[#D9D9D9] rounded-sm w-60 h-fit">
	<div class="flex justify-between px-2">
		<p class="text-[#0093ED] font-bold">Anggota</p>
		<button class="btn bg-[#0093ED] text-white font-semibold rounded-md py-0.5 px-2">Undang</button>
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
