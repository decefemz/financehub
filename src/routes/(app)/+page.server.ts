import Providers from '$lib/providers';
import type { PageServerLoad } from './search/$types';

const handler: PageServerLoad = async () => {
	const tickers = ['^GSPC', '^DJI', '^IXIC', '^RUT', 'CL=F', 'EURUSD=X'];

	// await Providers.getLinkedArticles({countries:["zw"]})

	const currentTimestamp = Date.now() / 1000;

	try {
		return {
			lazy: {
				stockData: Promise.all(
					tickers.map(
						async (ticker) =>
							await Providers.getStockData(
								ticker,
								Math.floor(currentTimestamp - 24 * 60 * 60),
								Math.floor(currentTimestamp),
								'5m'
							)
					)
				),
				articles: {
					featuredArticle: ''
				}
			}
		};
	} catch (err) {
		return {
			stockData: null
		};
	}
};

export const load = handler;
