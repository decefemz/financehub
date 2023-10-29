import Providers from '$lib/providers';
import Services from '$lib/services';
import type { PageServerLoad } from './search/$types';

// US
// 		Europe
// 		Asia
// 		Currencies
// 		Crypto
// 		Futures

const handler: PageServerLoad = async () => {
	const tickers = {
		US: ["^GSPC","^IXIC", "^DJI", "^RUT", "^VIX"],
		Europe:["^UKX", "^FCHI", "^IBEX", "^STOXX"],
		// Asia:["NI225","HSI","", "SENSEX", "NIFTY_50"]
	}
	const currentTimestamp = Date.now() / 1000;

	let featuredArticles = null;
	let marketOverview= null;
	try {
		featuredArticles= await Services.getLinkedArticles({limit:4});
		marketOverview = 
		{
			US:await Promise.all(
				tickers.US.map(
					async (ticker) =>
						await Providers.getStockData(
							ticker,
							Math.floor(currentTimestamp - 24 * 60 * 60 * 7),
							Math.floor(currentTimestamp),
							'15m'
						)
				)
			),
			Europe:await Promise.all(
				tickers.Europe.map(
					async (ticker) =>
						await Providers.getStockData(
							ticker,
							Math.floor(currentTimestamp - 24 * 60 * 60 * 7),
							Math.floor(currentTimestamp),
							'15m'
						)
				)
			)

		}
		
		return {
			articles: {
				featuredArticles,
			},
			marketOverview
			
		};
	} catch (err) {
		return {
			articles: {
				featuredArticles,
			},
			marketOverview
	}}
};

export const load = handler;
