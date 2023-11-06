export const ssr = false;

export function load() {
	const getPosts = async () => {
		const res = await fetch('http://127.0.0.1:8080/posts');
		const data = await res.json();
		return data;
	};

	return { posts: getPosts() };
}
