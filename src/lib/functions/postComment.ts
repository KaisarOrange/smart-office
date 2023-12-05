// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postComment = async (posts_id: number, comments: any) => {
	try {
		const res = await fetch(`http://127.0.0.1:8080/api/posts/comment`, {
			method: 'PUT',
			body: JSON.stringify({
				posts_id,
				comments
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const result = await res.json();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
};
