import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	plugins: [sveltekit(), mkcert(), purgeCss()],
	server: {
		// proxy: {
		// 	'/api': {
		// 		target: 'http://127.0.0.1:8080',
		// 	}
		// }
	}
});
