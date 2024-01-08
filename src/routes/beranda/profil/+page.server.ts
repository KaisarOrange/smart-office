/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '$env/dynamic/public';

export async function load({ fetch, locals }) {
	try {
		// 	const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${env.PUBLIC_USER_ID}/draft`);
		// 	const resLike = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${env.PUBLIC_USER_ID}/like`);

		// 	const data = await res.json();
		// 	const dataLike = await resLike.json();

		// 	return {
		// 		draft: data,
		// 		like: dataLike
		// 	};

		const fetchDraft = fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${locals.user.user_id}/draft`)
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
				return err;
			});

		const fetchLike = fetch(`${env.PUBLIC_SERVER_URL}/api/posts/${locals.user.user_id}/like`)
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
				return err;
			});

		return {
			stream_profile: {
				draft: new Promise((resolve) => {
					fetchDraft
						.then((data: any) => {
							resolve(data);
						})
						.catch((error: Error) => {
							console.log(error);
						});
				}),
				like: new Promise((resolve) => {
					fetchLike
						.then((data: any) => {
							resolve(data);
						})
						.catch((error: Error) => {
							console.log(error);
						});
				})
			},
			allowed: true
		};
	} catch (err) {
		console.log(err);
	}
}
