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
		<div class="flex gap-1 items-center">
			<div>
				<svg
					class=" stroke-[#0093ED] fill-blue_office inline-block"
					width="18px"
					height="18px"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>

			<p class="font-semibold">{message.username} menyukai unggahan anda!</p>
		</div>

		<div class="">{message.post_title}</div>
	</div>
</div>
