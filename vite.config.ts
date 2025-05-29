import { sentrySvelteKit } from '@sentry/sveltekit';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import postcssLightDark from '@csstools/postcss-light-dark-function';
import fs from 'node:fs';

const dirname =
	typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Simple plugin to handle robots.txt
function robotsTxt() {
	return {
		name: 'robots-txt',
		// Use generateBundle to emit the appropriate robots.txt file before the bundle is written
		generateBundle() {
			// Determine environment
			const isProd = process.env.PUBLIC_SITE_ENV === 'prod';
			const sourceFile = isProd ? 'src/robots/robots.prod.txt' : 'src/robots/robots.dev.txt';

			// Read the selected robots.txt content
			const robotsContent = fs.readFileSync(path.resolve(sourceFile), 'utf-8');

			// Emit the robots.txt file directly to the output bundle
			// This will be placed in the root of the build output directory
			// @ts-expect-error - this is fine
			this.emitFile({
				type: 'asset',
				fileName: 'robots.txt',
				source: robotsContent,
			});
		},
	};
}

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
	plugins: [
		sentrySvelteKit({
			autoUploadSourceMaps: !!process.env.IS_DEPLOYMENT,
			sourceMapsUploadOptions: {
				org: process.env.SENTRY_ORG,
				project: process.env.SENTRY_PROJECT,
			},
		}),
		paraglide({ project: './project.inlang', outdir: './src/lib/paraglide' }),
		tailwindcss(),
		sveltekit(),
		robotsTxt(),
	],
	css: {
		postcss: {
			// Needed as Safari (and other browsers) don't support light-dark css function that Skeleton UI uses
			plugins: [postcssLightDark({ preserve: false })],
		},
	},
	server: {
		allowedHosts: ['anchovy-wondrous-raven.ngrok-free.app'],
	},
	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts'],
				},
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
				},
			},
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, '.storybook'),
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: 'playwright',
						instances: [
							{
								browser: 'chromium',
							},
						],
					},
					setupFiles: ['.storybook/vitest.setup.ts'],
				},
			},
		],
	},
});
