export async function load({ url, fetch }) {
	const getUserInfo = async () => {
		const res = await fetch('api/user');
		const data = await res.json();

		return data;
	};

	const item = await getUserInfo();

	return {
		user: item,
		url: url.pathname
		// ruang: ruang.map((ruang) => ({
		// 	ruang: ruang.ruang,
		// 	img: ruang.img
		// }))
	};
}
