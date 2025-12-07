// @ts-check
import { defineConfig } from 'astro/config';
import qwik from '@qwikdev/astro';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	integrations: [qwik(), mdx()],
});
