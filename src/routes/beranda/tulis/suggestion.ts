import tippy from 'tippy.js';
import type { PopupSettings } from '@skeletonlabs/skeleton';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default {
	items: ({ query }: any) => {
		return ['AlifAyodya', 'BobbyNaufal', 'Dwiantoro', 'JoanS.T', 'Annie', 'Angel']
			.filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
			.slice(0, 5);
	},
	render: () => {
		let popup: any;

		return {
			onStart: (props) => {
				if (!props.clientRect) {
					return;
				}

				popup = tippy('body', {
					getReferenceClientRect: props.clientRect,
					appendTo: () => document.body,
					content: `${
						props.items.length >= 1
							? `<div class="flex flex-col bg-grey_office p-1"><div class="bg-white p-2">${props.items
									.map((e) => {
										console.log(e);
										return `<div onclick="click()" class="hover:text-blue_office hover:font-semibold cursor-pointer">@${
											props.items.length >= 1 ? e : 'not found'
										}</div>`;
									})
									.join('')}</div></div>`
							: 'not found'
					}`,
					allowHTML: true,
					showOnCreate: true,
					interactive: true,
					trigger: 'manual',
					placement: 'bottom-start'
				});
			},

			onUpdate(props) {
				if (!props.clientRect) {
					return;
				}
				popup[0].setProps({
					content: `${
						props.items.length >= 1
							? `<div class="flex flex-col bg-grey_office p-1"><div class="bg-white p-1">${props.items
									.map((e) => {
										return `<div>@${props.items.length >= 1 ? e : 'not found'}</div>`;
									})
									.join('')}</div></div>`
							: '<div class="flex flex-col bg-grey_office p-1"><div class="bg-white p-1">@tidak ditemukan</div></div>'
					}`
				});
			},

			onKeyDown(props) {
				if (props.event.key === 'Escape') {
					popup[0].hide();

					return true;
				}

				return false;
			},

			onExit() {
				popup[0].destroy();
			}
		};
	}
};
