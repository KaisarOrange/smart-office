/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '$env/dynamic/public';
// export const ssr = false;

export async function load({ fetch }) {
	try {
		// const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${env.PUBLIC_USER_ID}`);
		// const data = await res.json();

		const fet = fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${env.PUBLIC_USER_ID}`)
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
				return err;
			});

		return {
			streamed: {
				posts: new Promise((resolve) => {
					fet
						.then((data: any) => {
							resolve(data);
						})
						.catch((err) => {
							console.log(err);
							return err;
						});
				})
			}
		};
	} catch (error) {
		console.log(error);
	}
}
