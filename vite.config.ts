import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	const localApi = env.VITE_TEST_URL2;
	const SIMSApi = env.VITE_TEST_URL1;
	const local = env.VITE_LOCAL_URL;
	return {
		plugins: [react()],
		server: {
			port: 3000,
			// hmr: {
			// 	host: '192.168.0.212',
			// 	port: 8080,
			// 	protocol: 'ws',
			// },
			proxy: {
				'/api': {
					target: localApi,
					changeOrigin: true,
					ws: true,
					secure: false,
				},
				'/datainfo': {
					target: SIMSApi,
					changeOrigin: true,
					secure: false,
					ws: true,
				},
				'/member': {
					target: local,
					changeOrigin: true,
					secure: false,
					ws: true,
				},
			},
		},
	};
});
