import DB, { Models } from 'db';
import { eq } from 'drizzle-orm';
import Errors from 'errors';
import type { ArticleSource } from 'db/src/models/Articles/ArticleSources';

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
