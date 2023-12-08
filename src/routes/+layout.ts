import { env } from '$env/dynamic/public';

export const ssr = false;
export async function load({ url, fetch }) {
	try {
		const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/user/${env.PUBLIC_USER_ID}`);
		const data = await res.json();

		return {
			user: data,
			url: url.pathname
		};
	} catch (err) {
		console.log('hello: ', err);
	}
}
