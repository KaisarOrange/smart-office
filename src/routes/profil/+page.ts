import { PUBLIC_USER_ID } from '$env/static/public';

export async function load({ fetch }) {
	try {
		const res = await fetch(`http://127.0.0.1:8080/api/posts/${PUBLIC_USER_ID}/draft`);
		const data = await res.json();
		return {
			draft: data
		};
	} catch (err) {
		console.log(err);
	}
}
