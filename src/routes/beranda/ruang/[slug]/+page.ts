/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '$env/dynamic/public';
export const ssr = false;

export async function load({ fetch, params }) {
	try {
		const fet = fetch(`${env.PUBLIC_SERVER_URL}/api/ruang/${params.slug}`)
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
				return err;
			});

		const fetchReminders = fetch(`${env.PUBLIC_SERVER_URL}/api/ruang/${params.slug}/reminder`)
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
				return err;
			});

		return {
			ruang: {
				ruangs: new Promise((resolve) => {
					fet
						.then((data: any) => {
							resolve(data);
						})
						.catch((error: Error) => {
							console.log(error);
						});
				}),
				reminders: new Promise((resolve) => {
					fetchReminders
						.then((data: any) => {
							resolve(data);
						})
						.catch((error: Error) => {
							console.log(error);
						});
				})
			}
			// user: data,
		};
	} catch (err) {
		console.log('hello: ', err);
	}

	// const getRuang = async () => {
	// 	const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/ruang/${params.slug}`);
	// 	const data = await res.json();

	// 	return data;
	// };

	// return { ruang: await getRuang() };
}
