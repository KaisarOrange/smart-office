import { goto } from '$app/navigation';
import { env } from '$env/dynamic/public';
import { postSendMentionNotif } from './postSendMentionNotif';
import { postSetReminder } from './postSetReminder';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postPosts = async (
	ruang_id: string,
	draft: boolean,
	konten: any,
	privatee: boolean,
	user_id: string,
	userName: string,
	date: Date
	// reminder: boolean
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
			const result = await res.json();

			//MentionNotifs
			let mentionedUser: string[] = [];
			const filterMentionTypeDoc = konten.content?.filter((e: any) => {
				return e.content?.some((e: any) => e.type === 'mention');
			});
			filterMentionTypeDoc?.forEach((e: any) =>
				e.content?.forEach((e: any) => {
					if (e.type === 'mention') {
						mentionedUser = [...mentionedUser, e.attrs!.id];
					}
				})
			);

			console.log(mentionedUser);
			if (mentionedUser.length > 0) {
				const userInfo: any = result.data;

				postSendMentionNotif(userInfo.posts_id, title, ruang_id, user_id, mentionedUser);
			}

			//AssignedTasks
			let assignedUser: string[] = [];
			const filterAssignedUsers = konten.content?.filter((e: any) => e.type === 'taskList');
			filterAssignedUsers?.forEach((e: any) =>
				e.content?.forEach((e: any) => {
					e.content?.forEach((e: any) => {
						e.content?.forEach((e: any) => {
							console.log(e);
							if (e.type === 'mention') {
								assignedUser = [...assignedUser, e.attrs!.id];
							}
						});
					});
				})
			);

			//push current user into mentionAssigned user

			assignedUser = [...assignedUser, userName];

			if (assignedUser.length > 0) {
				const userInfo: any = result.data;

				let count = 0;
				let countTaskCompleted = 0;

				filterAssignedUsers?.forEach((e: any) =>
					e.content?.forEach((e: any) => {
						if (e.type === 'taskItem') {
							count++;
							if (e.attrs.checked === true) {
								countTaskCompleted++;
							}
						}
					})
				);

				console.log(count);
				console.log(countTaskCompleted);

				postSetReminder(
					userInfo.posts_id,
					title,
					ruang_id,
					count,
					countTaskCompleted,
					date.toISOString(),
					assignedUser
				);
			}

			//----------------//

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
