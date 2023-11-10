export function load({ fetch }) {
	const getPosts = async () => {
		const res = await fetch('api/posts');
		const data = await res.json();
		return data;
	};

	return { posts: getPosts() };
}
