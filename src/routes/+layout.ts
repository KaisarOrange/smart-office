import { PUBLIC_USER_ID } from '$env/static/public';

export async function load({ url, fetch }) {
	try {
		const res = await fetch(`http://127.0.0.1:8080/api/user/${PUBLIC_USER_ID}`);
		const data = await res.json();

		return {
			user: data,
			url: url.pathname
		};
	} catch (err) {
		console.log('hello: ', err);
	}
}
