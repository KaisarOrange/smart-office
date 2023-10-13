import { ruang, posts } from '$lib/data';

export function load({ url }) {
	return {
		url: url.pathname,
		posts,
		ruang: ruang.map((ruang) => ({
			ruang: ruang.ruang,
			img: ruang.img
		}))
	};
}
