import { env } from '$env/dynamic/public';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postSendMentionNotif = async (
	postId: number,
	postTitle: string,
	ruangId: string,
	user_id: string,
	mentionedUser: string[]
) => {
	try {
		await fetch(`${env.PUBLIC_SERVER_URL}/api/user/notif/mention`, {
			method: 'POST',
			body: JSON.stringify({
				sender_id: user_id,
				posts_id: postId,
				ruang_id: ruangId,
				post_title: postTitle,
				mentioned_users: mentionedUser
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
