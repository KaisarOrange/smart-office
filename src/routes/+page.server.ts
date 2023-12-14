/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from '@sveltejs/kit';
// export const ssr = false;

export async function load({ locals }) {
	if (locals.user) {
		throw redirect(302, '/beranda');
	}
}
