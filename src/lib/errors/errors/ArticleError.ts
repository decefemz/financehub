import _BaseError from './_BaseError';

export default class ArticleError extends _BaseError {
	public static readonly ERR_MSG_ARTICLE_SOURCE_NOT_FOUND = 'The article source was not found.';
	public static readonly ERR_MSG_ARTICLE_ALR_EXISTS = 'The article already exists.';
	public static readonly ERR_MSG_ARTICLE_SRC_ALR_EXISTS = 'The article source already exists.'

	constructor(message: string, status: number) {
		super('ArticleError', message, status);
	}

	static articleSourceNotFound() {
		return new ArticleError(this.ERR_MSG_ARTICLE_SOURCE_NOT_FOUND, 404);
	}

	static articleAlreadyExists() {
		return new ArticleError(this.ERR_MSG_ARTICLE_ALR_EXISTS, 400);
	}

	static articleSourceAlreadyExists() {
		return new ArticleError(this.ERR_MSG_ARTICLE_SRC_ALR_EXISTS, 400);
	}
}
