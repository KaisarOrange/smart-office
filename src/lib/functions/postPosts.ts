import { goto } from '$app/navigation';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const postPosts = async (ruang_id: string, konten: any) => {
	// const konten: any = get(editorJson);

	const hasTitle: boolean = konten.content[0].content ? true : false;

	if (hasTitle) {
		const title = konten.content[0].content[0].text;
		const res = await fetch(`http://127.0.0.1:8080/api/posts`, {
			method: 'POST',
			body: JSON.stringify({
				judul: title,
				konten: konten,
				user_id: '1eda295b-dba9-4a0e-ba5f-dc6cedc1ece5',
				ruang_id
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const respon = await res.json();
		console.log(respon);
		if (res.ok) {
			goto('/');
		}
	} else {
		alert('Please insert title');
	}
};
