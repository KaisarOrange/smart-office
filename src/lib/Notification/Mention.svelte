<script lang="ts">
	import { goto } from '$app/navigation';

	export let message: any;
</script>

<div
	on:click={() => goto(`/beranda/ruang/${message.ruang_id}/${message.post_id}`)}
	aria-hidden
	on:keydown={() => {}}
	class="flex gap-2 rounded-md bg-white p-2 mx-2 mb-2 cursor-pointer min-h-[60px]"
>
	<img class="w-8 h-8 object-cover rounded-full" src={message.user_picture} alt="profile_picture" />
	<div class="text-sm">
		<p class="text-blue_office"><i class="ri-at-line" /> Mention</p>

		<div class="flex gap-1 items-center">
			<p class="font-semibold">{message.username} menyebut anda dalam unggahannya!</p>
		</div>

		<div class="">{message.post_title}</div>
	</div>
</div>
