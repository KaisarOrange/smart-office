import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (locals.user) {
		throw redirect(302, '/beranda');
	}
}

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (username === '' && password === '') {
			return { inputEmpty: true, inputPasswordEmpty: true };
		} else if (username === '') {
			return { inputEmpty: true };
		} else if (password === '') {
			return { inputPasswordEmpty: true };
		}

		const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/auth/login`, {
			method: 'POST',
			body: JSON.stringify({
				user_name: username,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});

		if (res.status === 401) {
			return { credentials: true };
		}

		const result = await res.json();
		cookies.set('token', result.token, {
			path: '/',
			secure: false
		});

		if (res.ok) {
			throw redirect(302, '/beranda');
		}

		return { success: true };
	}
};
