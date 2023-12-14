/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';
import type { Actions } from '../$types.js';
// export const ssr = false;

export async function load({ fetch, locals }) {
	if (!locals.user) {
		throw redirect(302, '/');
	}
	try {
		// const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${env.PUBLIC_USER_ID}`);
		// const data = await res.json();

		const fet = fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${locals.user.user_id}`)
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

export const actions: Actions = {
	logout: ({ cookies }) => {
		cookies.set('token', '', {
			path: '/',
			expires: new Date(0)
		});

		throw redirect(302, '/');
	}
};
