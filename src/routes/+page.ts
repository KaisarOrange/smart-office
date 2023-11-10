export function load({ fetch }) {
	const getPosts = async () => {
		const res = await fetch('http://127.0.0.1:8080/api/posts');
		const data = await res.json();
		return data;
	};

	return { posts: getPosts() };
}
