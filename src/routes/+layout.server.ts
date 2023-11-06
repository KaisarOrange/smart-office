import { ruang } from '$lib/data';

export function load({ url }) {
	return {
		url: url.pathname,
		ruang: ruang.map((ruang) => ({
			ruang: ruang.ruang,
			img: ruang.img
		}))
	};
}
