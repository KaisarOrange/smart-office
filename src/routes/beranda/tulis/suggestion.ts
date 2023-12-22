import tippy from 'tippy.js';
import type { SvelteComponent } from 'svelte';
import { SvelteRenderer } from 'svelte-tiptap';
import PopUp from './PopUp.svelte';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
	items: ({ query }: any) => {
		return ['AlifAyodya', 'BobbyNaufal', 'Dwiantoro', 'JoanS.T', 'Annie', 'Angel']
			.filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
			.slice(0, 5);
	},
	render: () => {
		let popup: any;
		let component: any;
		const target = document.createElement('div');

		return {
			onStart: (props: any) => {
				console.log(props);
				const PopUpComp: SvelteComponent = new PopUp({ target, props });

				component = new SvelteRenderer(PopUpComp, { element: target });
				if (!props.clientRect) {
					return;
				}
				console.log(component);

				popup = tippy('body', {
					getReferenceClientRect: props.clientRect,
					appendTo: () => document.body,
					content: component.dom,
					allowHTML: true,
					showOnCreate: true,
					interactive: true,
					trigger: 'manual',
					placement: 'bottom-start'
				});
			},

			onUpdate(props: any) {
				component.updateProps(props);
				if (!props.clientRect) {
					return;
				}
				popup[0].setProps({
					getReferenceClientRect: props.clientRect
				});
			},

			onKeyDown(props: any) {
				if (props.event.key === 'Escape') {
					popup[0].hide();

					return true;
				}

				return false;
			},

			onExit() {
				popup[0].destroy();
				component.destroy();
			}
		};
	}
};
// content: `${
//     props.items.length >= 1
//         ? `<div class="flex flex-col bg-grey_office p-1"><div class="bg-white p-1">${props.items
//                 .map((e) => {
//                     return `<div>@${props.items.length >= 1 ? e : 'not found'}</div>`;
//                 })
//                 .join('')}</div></div>`
//         : '<div class="flex flex-col bg-grey_office p-1"><div class="bg-white p-1">@tidak ditemukan</div></div>'
// }`
