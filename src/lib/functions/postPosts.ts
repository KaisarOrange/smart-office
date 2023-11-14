import { goto } from '$app/navigation';
import { PUBLIC_USER_ID } from '$env/static/public';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postPosts = async (ruang_id: string, konten: any, privatee: boolean) => {
	// const konten: any = get(editorJson);

	const hasTitle: boolean = konten.content[0].content ? true : false;

	if (hasTitle) {
		const title = konten.content[0].content[0].text;
		try {
			if (privatee) {
				ruang_id = PUBLIC_USER_ID;
			}
			const res = await fetch(`http://127.0.0.1:8080/api/posts`, {
				method: 'POST',
				body: JSON.stringify({
					judul: title,
					konten: konten,
					user_id: PUBLIC_USER_ID,
					ruang_id,
					privatee,
					draft: false
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
