import { env } from '$env/dynamic/public';

export async function load({ url, fetch }) {
	try {
		const res = await fetch(`http://127.0.0.1:8080/api/user/${env.PUBLIC_USER_ID}`);
		const data = await res.json();

		return {
			user: data,
			url: url.pathname
		};
	} catch (err) {
		console.log('hello: ', err);
	}
}
