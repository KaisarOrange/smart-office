import { env } from '$env/dynamic/public';
import { redirect, type Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export const handle: Handle = async ({ event, resolve }) => {
	const requestPath = event.url.pathname;
	const cookies = event.cookies.get('token');

	if (!cookies) {
		return await resolve(event);
	}

	const date = Date.now();
	const jwtExpireTime = jwtDecode(cookies!).exp;
	const isJwtExpired = Math.floor(date / 1000) > jwtExpireTime!;

	if (isJwtExpired) {
		event.cookies.set('token', '', {
			path: '/',
			expires: new Date(0)
		});
		return await resolve(event);
	}

	const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/auth/restricted`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies}`
		},
		credentials: 'include'
	});

	type user = { user_name: string; user_id: string };

	const user: user = jwtDecode(cookies!);

	if (user && !isJwtExpired) {
		event.locals.user = {
			user_name: user.user_name,
			user_id: user.user_id
		};
		if (requestPath.includes('/beranda')) {
			if (res.status === 401) {
				throw redirect(303, '/');
			}
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
