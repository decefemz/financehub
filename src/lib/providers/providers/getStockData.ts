import Errors from '$lib/errors';

export default async function getStockData(
	ticker: string,
	startPeriod: number,
	endPeriod: number,
	interval: StockDataInterval
): Promise<StockData> {
	const requestURL = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURI(
		ticker
	)}?symbol=${ticker}&period1=${startPeriod}&period2=${endPeriod}&interval=${interval}`;
	console.log(requestURL)
	let chartData: StockData = {
		currency: '',
		symbol: '',
		exchangeName: '',
		instrumentType: '',
		previousClose: 0,
		interval: StockDataIntervalSeconds[interval],
		currentTradingPeriod: {
			timezone: '',
			start: 0,
			end: 0,
			gmtoffset: 0
		},
		OHLCVData: []
	};

	try {
		const response = await fetch(requestURL);

		if (response.status === 404) throw Errors.Market.tickerNotFound();
		if (response.status !== 200) throw Error('getStockData failed');

		const data: any = await response.json();

		if (!data.chart.result[0]) throw Errors.Market.tickerNotFound();

		chartData.currency = data.chart.result[0].meta.currency;
		chartData.symbol = data.chart.result[0].meta.symbol;
		chartData.exchangeName = data.chart.result[0].meta.exchangeName;
		chartData.instrumentType = data.chart.result[0].meta.instrumentType;
		chartData.previousClose = data.chart.result[0].meta.chartPreviousClose;
		chartData.currentTradingPeriod = data.chart.result[0].meta.currentTradingPeriod.regular;

		if(!data.chart.result[0]?.timestamp?.length) return chartData;
		data.chart.result[0]?.timestamp.forEach((timestamp: number, index: number) => {
			chartData.OHLCVData.push({
				timestamp,
				open: data.chart.result[0].indicators.quote[0].open[index],
				high: data.chart.result[0].indicators.quote[0].high[index],
				low: data.chart.result[0].indicators.quote[0].low[index],
				close: data.chart.result[0].indicators.quote[0].close[index],
				volume: data.chart.result[0].indicators.quote[0].volume[index],
				adjClose: data.chart.result[0].indicators?.adjclose
					? data.chart.result[0].indicators.adjclose[0]?.adjclose[index]
					: null
			});
		});
		return chartData;
	} catch (e) {
		console.log(e)
		throw e;
	}
}

export interface StockData {
	currency: string;
	symbol: string;
	exchangeName: string;
	instrumentType: string;
	previousClose: number;
	interval: number;
	currentTradingPeriod: {
		timezone: string;
		start: number;
		end: number;
		gmtoffset: number;
	};
	OHLCVData: {
		timestamp: number;
		open: number;
		high: number;
		low: number;
		close: number;
		volume: number;
		adjClose: number | null;
	}[];
}

const StockDataIntervalSeconds: Record<string, number> = {
	'1m': 60,
	'2m': 120,
	'5m': 300,
	'15m': 900,
	'30m': 1800,
	'60m': 3600,
	'90m': 5400,
	'1h': 3600,
	'1d': 86400,
	'5d': 432000,
	'1wk': 604800,
	'1mo': 2592000,
	'3mo': 7776000
} as const;

export type StockDataInterval = keyof typeof StockDataIntervalSeconds;
