/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';

// export const ssr = false;
export async function load({ fetch, locals }) {
	if (!locals.user) {
		throw redirect(302, '/');
	}
	const userID = locals.user.user_id;
	try {
		// const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/user/${env.PUBLIC_USER_ID}`);
		// const data = await res.json();

		const fet = fetch(`${env.PUBLIC_SERVER_URL}/api/user/${locals.user.user_id}`)
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
				return err;
			});

		return {
			stream: {
				users: new Promise((resolve) => {
					fet
						.then((data: any) => {
							resolve(data);
						})
						.catch((error: Error) => {
							console.log(error);
						});
				})
			},
			currentUserID: userID,
			currentUserName: locals.user.user_name
			// user: data,
		};
	} catch (err) {
		console.log('hello: ', err);
	}
}
