import type { Action, Actions } from './$types';

const handler: Action = async ({ fetch, request, cookies, getClientAddress }) => {
	const formData = await request.formData();
	const query = formData.get('query')?.toString() || '';
	const url: string = `https://query2.finance.yahoo.com/v1/finance/search
    ?q=${query}
    &lang=en-US
    &region=US
    &quotesCount=5
    &newsCount=0
    &listsCount=0
    &enableFuzzyQuery=false
    &quotesQueryId=tss_match_phrase_query
    &multiQuoteQueryId=multi_quote_single_token_query
    &newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true
    &enableEnhancedTrivialQuery=true&enableResearchReports=true
    &enableCulturalAssets=true
    &enableLogoUrl=true
    &researchReportsCount=2`;

	try {
		const response = await fetch(url).then((res) => res.json());
		const quotes = response || [];
		console.log(quotes);

		return { quotes };
	} catch (err) {
		// console.log(err);
		return { quotes: [] };
	}
};

export const actions: Actions = {
	default: handler
};
