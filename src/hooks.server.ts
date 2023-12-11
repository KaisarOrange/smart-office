import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const requestPath = event.url.pathname;
	const cookies = event.cookies.get('token');

	const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/auth/restricted`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies}`
		}
	});

	if (requestPath.includes('/beranda')) {
		console.log(res.status);
		if (res.status === 401) {
			throw redirect(303, '/');
		}
	}
	if (requestPath.includes('/login') || requestPath.includes('/daftar') || requestPath === '/') {
		console.log(res.status);
		if (res.status === 200) {
			throw redirect(303, '/beranda');
		}
	}

	const response = await resolve(event);

	return response;
};
