import { goto } from '$app/navigation';
import { env } from '$env/dynamic/public';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postPosts = async (
	ruang_id: string,
	draft: boolean,
	konten: any,
	privatee: boolean,
	user_id: string
) => {
	// const konten: any = get(editorJson);

	const hasTitle: boolean = konten.content[0].content ? true : false;

	if (hasTitle) {
		const title = konten.content[0].content[0].text;
		try {
			if (privatee) {
				ruang_id = user_id;
				console.log(ruang_id);
			}
			const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts`, {
				method: 'POST',
				body: JSON.stringify({
					judul: title,
					konten: konten,
					user_id: user_id,
					ruang_id,
					private: privatee,
					draft
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			// const result = await res.json();

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
