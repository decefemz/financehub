import _BaseError from './_BaseError';

export default class MarketError extends _BaseError {
	public static readonly ERR_MSG_TICKER_NOT_FOUND = 'The ticker you requested was not found.';

	constructor(message: string, status: number) {
		super('MarketError', message, status);
	}

	static tickerNotFound() {
		return new MarketError(this.ERR_MSG_TICKER_NOT_FOUND, 404);
	}
}
