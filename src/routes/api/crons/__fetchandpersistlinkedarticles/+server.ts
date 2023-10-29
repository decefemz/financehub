import Providers from '$lib/providers';
import type { countryCode } from '$lib/providers/providers/getLinkedArticles';
import Services from '$lib/services';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ulid } from "ulid"
import type { LinkedArticles, LinkedArticle } from '$lib/models/Articles/LinkedArticles';
import ErrorHandler from '$lib/middleware/ErrorHandler';

// __fetchandpersistlinkedarticles
const handler: RequestHandler = async ({ url }) => {
    const articleSources = new Map<string, string>();
    const countries: countryCode[] = ["zw", "za"];

    async function getSourceID(source: { url: string; name: string }): Promise<string> {
        let sourceID: string = articleSources.get(source.url) ?? '';
        if (sourceID) return sourceID;

        try {
            sourceID = (await Services.getArticleSource({ by: "url", queryValue: source.url })).id;
            if (!sourceID)
                sourceID = (await Services.createArticleSource({
                    name: source.name,
                    url: source.url
                })).id;

            return sourceID;
        }
        catch (e) {
            return ""
        }
    }

    const articlesToPersist = [...await Providers.getLinkedArticles({}), ...await Providers.getLinkedArticles({ countries })]

    //TODO:Do not persist article if information is not complete

    Services.createLinkedArticles({
        LinkedArticles: await Promise.all(
            articlesToPersist.map(async (a) => {
                const sourceID = await getSourceID(a.source);
                return {
                    id: ulid(),
                    publishedAt: a.publishedAt,
                    title: a.title,
                    url: a.url,
                    imageSrc: a.imageSrc,
                    description: a.description,
                    content: a.content,
                    sourceID,
                    keywords: (a.keywords) ? a.keywords.join(",") : "",
                    countries: (a?.countries) ? a.countries.join(",") : "",
                    categories: (a?.categories) ? a.categories.join(",") : "",
                    relevance: a.relevance,
                    sentiment: a.sentiment,
                } as LinkedArticle;
            })
        )
    })

    return json({
        status: "success",
        articlesToPersist
    })

};

export const POST = ErrorHandler.RequestHandler(handler)