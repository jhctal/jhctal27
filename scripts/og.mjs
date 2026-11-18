// Generates the social preview card (src/assets/og.png) from PROFILE in src/consts.ts.
// Run with `pnpm og` after changing your name, role, tagline or location.

import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';
import { PROFILE } from '../src/consts.ts';

const require = createRequire(import.meta.url);
const font = (pkg, file) => readFile(require.resolve(`@fontsource/${pkg}/files/${file}`));

const W = 1200;
const H = 630;
const PAD = 72;
const BG = '#fafaf8';
const FG = '#0b0b0c';
const MUTED = '#6e6e73';
const ACCENT = '#ff4f12';

const h = (type, style, ...children) => ({ type, props: { style, children } });

// Dot field fading towards the edges, with an accent hotspot like the hero cursor
function dots() {
	const [cx, cy, radius, gap] = [960, 170, 230, 24];
	let out = '';
	for (let gy = 12; gy < H; gy += gap) {
		for (let gx = 12; gx < W; gx += gap) {
			const edge = Math.min(1, Math.hypot((gx - W / 2) / (W * 0.62), (gy - H / 2) / (H * 0.62)));
			const base = 0.14 * (1 - edge ** 2);
			const d = Math.hypot(gx - cx, gy - cy) || 1;
			let inf = Math.max(0, 1 - d / radius);
			inf = inf * inf * (3 - 2 * inf);
			const x = (gx + ((gx - cx) / d) * inf * 14).toFixed(1);
			const y = (gy + ((gy - cy) / d) * inf * 14).toFixed(1);
			const r = (1 + inf * 1.8).toFixed(2);
			if (base > 0.01) {
				out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${FG}" opacity="${(base + inf * 0.3).toFixed(3)}"/>`;
			}
			if (inf > 0.03) {
				out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${ACCENT}" opacity="${Math.min(1, inf * 0.95).toFixed(3)}"/>`;
			}
		}
	}
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="${BG}"/>${out}</svg>`;
}

// One span per word so the mixed sans/serif line wraps naturally
const words = [
	...PROFILE.role.split(' ').map((w) => h('span', { fontFamily: 'Geist', fontWeight: 500, color: FG }, w)),
	...PROFILE.tagline
		.split(' ')
		.map((w) => h('span', { fontFamily: 'Instrument Serif', fontStyle: 'italic', color: MUTED }, w)),
];

const card = h(
	'div',
	{ width: W, height: H, display: 'flex', position: 'relative' },
	h(
		'div',
		{ position: 'absolute', top: PAD - 2, left: PAD, display: 'flex', alignItems: 'center', gap: 12 },
		h('div', { width: 14, height: 14, borderRadius: 7, backgroundColor: ACCENT }),
		h(
			'span',
			{ fontFamily: 'Geist Mono', fontSize: 17, color: MUTED, letterSpacing: '0.02em' },
			PROFILE.location.toUpperCase(),
		),
	),
	h(
		'div',
		{
			position: 'absolute',
			top: 170,
			left: PAD - 12,
			fontFamily: 'Geist',
			fontWeight: 300,
			fontSize: 250,
			lineHeight: 1,
			letterSpacing: '-0.065em',
			color: FG,
		},
		PROFILE.name,
	),
	h(
		'div',
		{
			position: 'absolute',
			top: 446,
			left: PAD,
			width: W - PAD * 2,
			display: 'flex',
			flexWrap: 'wrap',
			columnGap: 9,
			fontSize: 34,
			lineHeight: 1.25,
			letterSpacing: '-0.01em',
		},
		...words,
	),
);

const textSvg = await satori(card, {
	width: W,
	height: H,
	fonts: [
		{ name: 'Geist', weight: 300, style: 'normal', data: await font('geist', 'geist-latin-300-normal.woff') },
		{ name: 'Geist', weight: 500, style: 'normal', data: await font('geist', 'geist-latin-500-normal.woff') },
		{ name: 'Geist Mono', weight: 400, style: 'normal', data: await font('geist-mono', 'geist-mono-latin-400-normal.woff') },
		{
			name: 'Instrument Serif',
			weight: 400,
			style: 'italic',
			data: await font('instrument-serif', 'instrument-serif-latin-400-italic.woff'),
		},
	],
});

const out = new URL('../src/assets/og.png', import.meta.url);
await sharp(Buffer.from(dots()))
	.composite([{ input: Buffer.from(textSvg) }])
	.png({ compressionLevel: 9 })
	.toFile(out.pathname);

console.log(`Wrote ${out.pathname}`);
