import { goto } from '$app/navigation';
import { env } from '$env/dynamic/public';
import { PUBLIC_USER_ID } from '$env/static/public';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postUpdate = async (id: string, konten: any) => {
	// const konten: any = get(editorJson);
	const hasTitle: boolean = konten.content[0].content ? true : false;

	if (hasTitle) {
		const title = konten.content[0].content[0].text;
		console.log(title);
		try {
			// if (privatee) {
			// 	ruang_id = PUBLIC_USER_ID;
			// }
			const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts`, {
				method: 'PUT',
				body: JSON.stringify({
					judul: title,
					konten: konten,
					user_id: PUBLIC_USER_ID,
					id
				}),
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
	} else {
		alert('Please insert title');
	}
};
