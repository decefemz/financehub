import { NEWS_API_KEY } from '$env/static/private';

export default async function getLinkedArticles({
	countries
}: GetLinkedArticlesParams): Promise<_LinkedArticle[]> {
	let params = {
		apiKey: NEWS_API_KEY,
		resultType: 'articles',
		articlesSortBy: 'rel',
		includeArticleSocialScore: true,
		includeArticleCategories: true,
		includeArticleLocation: true,
		includeArticleImage: true,
		includeArticleLinks: true,
		includeArticleExtractedDates: true,
		includeArticleOriginalArticle: true,
		query: {
			$query: {
				$and: [
					{
						lang: 'eng'
					}
				] as any[]
			},
			$filter: {
				forceMaxDataTimeWindow: '7',
				isDuplicate: 'skipDuplicates'
			}
		}
	};

	if (countries)
		params.query.$query.$and.push({
			$or: countries.map((country) => ({ locationUri: countryUri[country] }))
		});

	const response = await fetch('https://newsapi.ai/api/v1/article/getArticles', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	});

	const data = await response.json();
	if (!data.articles.results?.length) return [];

	return data.articles.results.map((article: any) => {
		return {
			publishedAt: article.dateTimePub,
			url: article.url,
			title: article.title,
			content: article.body,
			description: article.body,
			imageSrc: article.image,
			sentiment: article.sentiment,
			relevance: article.relevance,
			source: {
				name: article.source.title,
				url: article.source.uri
			},
			keywords: article.concepts ? article.concepts.map((concept: any) => concept.label.eng) : [],
			countries: countries
		} as _LinkedArticle;
	});
}

type countryCode = 'zw' | 'za' | 'zm';

interface GetLinkedArticlesParams {
	countries?: countryCode[];
}

const countryUri: Record<countryCode, string> = {
	zw: 'http://en.wikipedia.org/wiki/Zimbabwe',
	za: 'http://en.wikipedia.org/wiki/South_Africa',
	zm: 'http://en.wikipedia.org/wiki/Zambia'
};

interface _LinkedArticle {
	lang: string;
	publishedAt: Date;
	url: string;
	title: string;
	content: string;
	description: string;
	imageSrc: string;
	sentiment: number;
	relevance: number;
	source: {
		name: string;
		url: string;
	};
	keywords: string[];
	countries: string[];
}
