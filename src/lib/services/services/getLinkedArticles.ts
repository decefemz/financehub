import DB from '$lib/db';
import Errors from '$lib/errors';
import Models from '$lib/models';
import type { ArticleSource } from '$lib/models/Articles/ArticleSources';
import type { LinkedArticle } from '$lib/models/Articles/LinkedArticles';
import { desc, eq, like } from 'drizzle-orm';

interface GetArticlesParams {
    country?: string;
    limit?: number;
}
export default async function getLinkedArticles({ country, limit }: GetArticlesParams): Promise<Array<LinkedArticle & {source:ArticleSource}>> {
    try {
        let query = DB.select()
            .from(Models.LinkedArticles)
            .innerJoin(Models.ArticleSources, eq(Models.LinkedArticles.sourceID, Models.ArticleSources.id))
            .orderBy(desc(Models.LinkedArticles.publishedAt),
                desc(Models.LinkedArticles.relevance))
            .limit(limit ?? 10);

        if (country) query.where(like(Models.LinkedArticles.countries, `%${country}%`));

        const LinkedArticles = (
            await query
        );
        if (!LinkedArticles) throw Errors.Auth.userNotLoggedIn();

        return LinkedArticles.map((a)=>({...a.linked_articles, source:a.article_sources}));
    } catch (e: any) {
        throw e;
    }
}
