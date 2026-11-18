import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SHOW_WRITING, SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = SHOW_WRITING ? await getCollection('blog') : [];
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
