import { editorJson } from './Stores/editorOutput';
import { get } from 'svelte/store';

export const postPosts = async () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const konten: any = get(editorJson);
	const hasTitle: boolean = konten.content[0].content ? true : false;

	if (hasTitle) {
		const title = konten.content[0].content[0].text;
		const res = await fetch(`api/posts`, {
			method: 'POST',
			body: JSON.stringify({
				judul: title,
				konten: konten,
				user_id: '2b70bb78-dba7-48eb-bce3-ae753c8fa542'
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log(res);
	} else {
		alert('Please insert title');
	}
};
