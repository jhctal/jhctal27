// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { SHOW_WRITING } from './src/consts';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [
		mdx(),
		sitemap({ filter: (page) => SHOW_WRITING || !new URL(page).pathname.startsWith('/blog') }),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Geist',
			cssVariable: '--font-sans',
			// Variable range so the hero name can morph between weights
			weights: ['100 900'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Geist Mono',
			cssVariable: '--font-mono',
			weights: [400, 500],
			fallbacks: ['ui-monospace', 'monospace'],
		},
		{
			provider: fontProviders.google(),
			name: 'Instrument Serif',
			cssVariable: '--font-serif',
			weights: [400],
			styles: ['normal', 'italic'],
			fallbacks: ['Georgia', 'serif'],
		},
	],
});
