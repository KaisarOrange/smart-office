import { env } from '$env/dynamic/public';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postSetReminder = async (
	postId: number,
	postTitle: string,
	ruangId: string,
	totalTask: number,
	completedTask: number,
	dueTime: string,
	mentionedUser: string[]
) => {
	console.log(mentionedUser);
	try {
		const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/user/reminder`, {
			method: 'PUT',
			body: JSON.stringify({
				title: postTitle,
				completed_task: completedTask,
				total_task: totalTask,
				due_time: dueTime,
				mentioned_users: mentionedUser,
				ruang_id: ruangId,
				post_id: postId
			}),
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
