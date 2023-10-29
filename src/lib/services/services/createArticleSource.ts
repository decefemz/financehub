import DB, { type Transaction } from '$lib/db';
import Errors from '$lib/errors';
import Models from '$lib/models';
import type { ArticleSource } from '$lib/models/Articles/ArticleSources';

import { ulid } from 'ulid';

interface CreateArticleSourceParams {
  Tx?: Transaction;
  name: string;
  url: string;
}

export default async function createArticleSource(
  params: CreateArticleSourceParams
): Promise<ArticleSource> {
  const articleSource: ArticleSource = {
    id: ulid(),
    name: params.name,
    url: params.url,
  };

  try {
    params.Tx
      ? await params.Tx.insert(Models.ArticleSources).values(articleSource).execute()
      : await DB.insert(Models.ArticleSources).values(articleSource).execute();
  } catch (e: any) {
    if (e.message.includes('Duplicate entry') & e.message.includes('article_sources.unique_article_src_url')) {
      throw Errors.Article.articleSourceAlreadyExists();
    }
    throw e;
  }

  return articleSource;
}
