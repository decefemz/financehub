import _BaseError from './_BaseError';

export default class ArticleError extends _BaseError {
  public static readonly ERR_MSG_ARTICLE_SOURCE_NOT_FOUND = 'The article source was not found.';

  constructor(message: string, status: number) {
    super('ArticleError', message, status);
  }

  static articleSourceNotFound() {
    return new ArticleError(this.ERR_MSG_ARTICLE_SOURCE_NOT_FOUND, 404);
  }
}
