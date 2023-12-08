import { env } from '$env/dynamic/public';

export async function load({ fetch }) {
	try {
		const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${env.PUBLIC_USER_ID}`);
		const data = await res.json();

		return { posts: data };
	} catch (error) {
		console.log(error);
	}
}
