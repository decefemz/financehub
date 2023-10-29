import DB from '$lib/db';
import Errors from '$lib/errors';
import Models from '$lib/models';
import type { ArticleSource } from '$lib/models/Articles/ArticleSources';
import { eq } from 'drizzle-orm';

interface GetArticleSourceParams {
	by: 'id' | 'url';
	queryValue: string;
}

export default async function getArticleSource({
	by,
	queryValue
}: GetArticleSourceParams): Promise<ArticleSource> {
	const query: Record<GetArticleSourceParams['by'], ReturnType<typeof eq>> = {
		id: eq(Models.ArticleSources.id, queryValue),
		url: eq(Models.ArticleSources.url, queryValue)
	};
	try {
		const articleSource = (await DB.select().from(Models.ArticleSources).where(query[by]))[0];
		if (!articleSource) throw Errors.Article.articleSourceNotFound();
		return articleSource;
	} catch (e: any) {
		throw e;
	}
}
