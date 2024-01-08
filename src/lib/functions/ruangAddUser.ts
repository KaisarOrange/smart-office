import { env } from '$env/dynamic/public';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ruangAddUser = async (user: string, ruang: string) => {
	try {
		const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/ruangupdate/${ruang}/${user}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const result = await res.json();
		console.log(result);
	} catch (error: any) {
		console.error(error);
	}
};
