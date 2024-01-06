import { goto } from '$app/navigation';
import { env } from '$env/dynamic/public';
import { postSetReminder } from './postSetReminder';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postUpdate = async (id: string, konten: any, user_id: string, userName: string) => {
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
					user_id: user_id,
					id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const result = await res.json();
			console.log(result);

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
			const hasLoggedUser = assignedUser.includes(userName);
			console.log(hasLoggedUser);

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

				const date = new Date();
				postSetReminder(
					userInfo.id,
					title,
					result.ruang_id,
					count,
					countTaskCompleted,
					date.toISOString(),
					assignedUser
				);
			}

			if (res.ok) {
				goto('/beranda');
			}
		} catch (error: any) {
			console.error(error);
		}
	} else {
		alert('Please insert title');
	}
};
