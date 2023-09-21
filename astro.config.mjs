import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import lit from '@astrojs/lit';
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
	integrations: [
		//
		vue(),
		lit(),
		solidJs(),
		svelte(),
		react(),
	],
});