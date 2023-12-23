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

	let selected = 0;

	const selectItem = (e: any) => {
		if (e.key === 'Shift' && selected <= items.length - 1) {
			selected += 1;
		} else if (selected === items.length) {
			selected = 0;
		}
		if (e.key === 'Tab') {
			command({ id: items[selected] });
		}
	};
</script>

<svelte:window on:keydown={selectItem} />

<div class="flex flex-col bg-grey_office p-1">
	<div class="bg-white p-1 flex flex-col pr-2" aria-hidden>
		{#if items.length >= 1}
			{#each items as item, i}
				<div
					on:click={() => {
						command({ id: item });
					}}
					on:keydown={() => {}}
					aria-hidden
					on:mouseenter={() => {
						selected = i;
					}}
					class="{i === selected ? 'text-blue_office font-semibold' : ''} m-0 cursor-pointer"
				>
					@{item}
				</div>
			{/each}
			{clicked}
		{:else}
			<div>@tidak ditemukan</div>
		{/if}
	</div>
</div>
