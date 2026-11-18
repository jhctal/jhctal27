// Generates the rest of the icon set in public/ from public/latch_logo.svg.
// Run with `pnpm icons` after changing the logo.

import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { PROFILE } from '../src/consts.ts';

const publicDir = new URL('../public/', import.meta.url);
const write = (name, data) => writeFile(new URL(name, publicDir), data);

const logo = await readFile(new URL('latch_logo.svg', publicDir), 'utf8');

// Android's maskable icon must be full-bleed (the launcher crops it to its own shape),
// so swap the logo's squircle (its first path) for a square background there
const viewBox = logo.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
const shape = logo.match(/<path[^>]*\/>/)[0];
const background = shape.match(/fill="([^"]+)"/)[1];
const square = logo.replace(shape, `<rect width="${viewBox[1]}" height="${viewBox[2]}" fill="${background}"/>`);

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

// Minimal ICO container holding PNG images
function ico(images) {
	const header = Buffer.alloc(6 + images.length * 16);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(images.length, 4);
	let offset = header.length;
	images.forEach(({ size, data }, i) => {
		const e = 6 + i * 16;
		header.writeUInt8(size % 256, e);
		header.writeUInt8(size % 256, e + 1);
		header.writeUInt16LE(1, e + 4);
		header.writeUInt16LE(32, e + 6);
		header.writeUInt32LE(data.length, e + 8);
		header.writeUInt32LE(offset, e + 12);
		offset += data.length;
	});
	return Buffer.concat([header, ...images.map((i) => i.data)]);
}

const icoImages = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(logo, size) })));

const manifest = {
	name: PROFILE.fullName,
	short_name: PROFILE.name,
	icons: [
		{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
		{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
		{ src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
	],
	theme_color: background,
	background_color: background,
	display: 'browser',
};

await Promise.all([
	write('favicon.ico', ico(icoImages)),
	// iOS rounds the corners itself and fills transparency with black, so give it the full-bleed square
	write('apple-touch-icon.png', await png(square, 180)),
	write('icon-192.png', await png(logo, 192)),
	write('icon-512.png', await png(logo, 512)),
	write('icon-maskable-512.png', await png(square, 512)),
	write('site.webmanifest', JSON.stringify(manifest, null, 2) + '\n'),
]);

console.log('Wrote favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png, site.webmanifest');
