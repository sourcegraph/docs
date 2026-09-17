import {MetadataRoute} from 'next';
import config from 'docs.config';

export default async function robots(): Promise<MetadataRoute.Robots> {
	return {
		rules: {
			userAgent: '*',
			allow: '/'
		},
		sitemap: `${config.DOCS_PROD_URL}/sitemap.xml`
	};
}
