<script lang="ts">
	export let items: any;
	export let editor: any;
	export let range: any;
	export let query: any;
	export let command: any;
	export let clientRect: any;
	export let decorationNode: any;
	export let text: any;

	let clicked = '';
	console.log(items);
</script>

<div class="flex flex-col bg-grey_office p-1">
	<div class="bg-white p-1 flex flex-col pr-2">
		{#if items.length >= 1}
			{#each items as item}
				<div
					on:click={() => {
						command({ id: item });
					}}
					on:keydown={() => {}}
					aria-hidden
					class="hover:text-blue_office m-0 hover:font-semibold cursor-pointer"
				>
					@{item}
				</div>
			{/each}
			{clicked}
		{:else}
			<div>not found</div>
		{/if}
	</div>
</div>
