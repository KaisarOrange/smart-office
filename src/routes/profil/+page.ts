import { env } from '$env/dynamic/public';

export async function load({ fetch }) {
	try {
		const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${env.PUBLIC_USER_ID}/draft`);
		const resLike = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${env.PUBLIC_USER_ID}/like`);

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
