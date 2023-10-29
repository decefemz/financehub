import DB from '$lib/db';
import Errors from '$lib/errors';
import Models from '$lib/models';
import type { LinkedArticle } from '$lib/models/Articles/LinkedArticles';
import { desc, like } from 'drizzle-orm';

interface GetArticlesParams {
    country: string;
    limit?: number;
}
export default async function getLinkedArticles({ country, limit }: GetArticlesParams): Promise<LinkedArticle[]> {
    try {
        let query = DB.select()
            .from(Models.LinkedArticles)
            .orderBy(desc(Models.LinkedArticles.publishedAt),
                desc(Models.LinkedArticles.relevance))
            .limit(limit ?? 10);

        if (country) query.where(like(Models.LinkedArticles.countries, `%${country}%`));

        const LinkedArticles = (
            await query
        );
        if (!LinkedArticles) throw Errors.Auth.userNotLoggedIn();
        return LinkedArticles;
    } catch (e: any) {
        throw e;
    }
}
