import { env } from '$env/dynamic/public';
export const ssr = false;

export async function load({ fetch, params }) {
	const getRuang = async () => {
		const res = await fetch(`${env.PUBLIC_SERVER_URL}/api/ruang/${params.slug}`);
		const data = await res.json();

		return data;
	};

	return { ruang: await getRuang() };
}
