/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, locals, params }) {
	if (!locals.user) {
		throw redirect(302, '/');
	}
	try {
		// const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${env.PUBLIC_USER_ID}`);
		// const data = await res.json();

		const fet = fetch(`${env.PUBLIC_SERVER_URL}/api/post/${params.post}`)
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
				return err;
			});
		const isAllowed = await fetch(
			`${env.PUBLIC_SERVER_URL}/api/post/${locals.user.user_id}/${params.post}/allow`
		);
		const resIsAllowed = await isAllowed.json();
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
			},
			allowed: resIsAllowed.data
		};
	} catch (error) {
		console.log(error);
	}
}
