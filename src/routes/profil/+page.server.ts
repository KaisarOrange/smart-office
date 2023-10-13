import { posts } from '$lib/data';

export function load() {
	return {
		posts: posts.filter((post) => post.author_name === 'Alif Ayodya')
	};
}
