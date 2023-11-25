import { goto } from '$app/navigation';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postDelete = async (id: string) => {
	// const konten: any = get(editorJson);

	try {
		// if (privatee) {
		// 	ruang_id = PUBLIC_USER_ID;
		// }
		const res = await fetch(`http://127.0.0.1:8080/api/posts/delete/${id}`, {
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
