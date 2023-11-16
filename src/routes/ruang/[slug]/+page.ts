export async function load({ fetch, params }) {
	const getRuang = async () => {
		const res = await fetch(`http://127.0.0.1:8080/api/ruang/${params.slug}`);
		const data = await res.json();

		return data;
	};

	return { ruang: await getRuang() };
}
