import DB, { type Transaction } from '$lib/db';
import Models from '$lib/models';
import type { ArticleSource } from '$lib/models/Articles/ArticleSources';

import { ulid } from 'ulid';

interface CreateArticleSourceParams {
	Tx?: Transaction;
	name: string;
	url: string;
	faviconSrc?: string;
}

export default async function createArticleSource(
	params: CreateArticleSourceParams
): Promise<ArticleSource> {
	const articleSource: ArticleSource = {
		id: ulid(),
		name: params.name,
		url: params.url,
		faviconSrc: params.faviconSrc ?? null
	};

	try {
		params.Tx
			? await params.Tx.insert(Models.ArticleSources).values(articleSource).execute()
			: await DB.insert(Models.ArticleSources).values(articleSource).execute();
	} catch (e: any) {
		throw e;
	}

	return articleSource;
}
