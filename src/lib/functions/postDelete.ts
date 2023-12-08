import { goto } from '$app/navigation';
import { env } from '$env/dynamic/public';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postDelete = async (id: string) => {
	// const konten: any = get(editorJson);

	try {
		// if (privatee) {
		// 	ruang_id = PUBLIC_USER_ID;
		// }
		const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/delete/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const result = await res.json();
		console.log(result);
		if (res.ok) {
			goto('/');
		}
	} catch (error: any) {
		console.error(error);
	}
};
