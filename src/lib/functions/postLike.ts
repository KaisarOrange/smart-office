import { env } from '$env/dynamic/public';
import { PUBLIC_USER_ID } from '$env/static/public';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postLike = async (liked: boolean, id: number) => {
	// const konten: any = get(editorJson);
	try {
		// if (privatee) {
		// 	ruang_id = PUBLIC_USER_ID;
		// }
		await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/like`, {
			method: 'PUT',
			body: JSON.stringify({
				user_id: PUBLIC_USER_ID,
				posts_id: id
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		// const result = await res.json();
	} catch (error: any) {
		console.error(error);
	}
};
