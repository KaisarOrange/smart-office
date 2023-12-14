import { env } from '$env/dynamic/public';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postComment = async (posts_id: number, comments: any) => {
	try {
		const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/posts/comment`, {
			method: 'PUT',
			body: JSON.stringify({
				posts_id,
				comments
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			return;
		}
		// const result = await res.json();
	} catch (error) {
		console.error(error);
	}
};
