import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/auth/login`, {
			method: 'POST',
			body: JSON.stringify({
				user_name: username,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const result = await res.json();

		cookies.set('token', result.token);

		if (res.ok) {
			throw redirect(302, '/beranda');
		}

		return { success: true };
	}
};
