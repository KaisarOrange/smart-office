import { PUBLIC_USER_ID } from '$env/static/public';
export async function load({ fetch }) {
	try {
		const res = await fetch(`http://127.0.0.1:8080/api/posts/${PUBLIC_USER_ID}/draft`);
		const resLike = await fetch(`http://127.0.0.1:8080/api/posts/${PUBLIC_USER_ID}/like`);

		const data = await res.json();
		const dataLike = await resLike.json();

		return {
			draft: data,
			like: dataLike
		};
	} catch (err) {
		console.log(err);
	}
}
