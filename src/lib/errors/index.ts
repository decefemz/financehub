import AccountError from './errors/AccountError';
import ArticleError from './errors/ArticleError';
import AuthError from './errors/AuthError';
import GeneralError from './errors/GeneralError';
import MarketError from './errors/MarketError';
import _BaseError from './errors/_BaseError';

namespace Errors {
	export const _Base = _BaseError;
	export const Account = AccountError;
	export const Article = ArticleError;
	export const General = GeneralError;
	export const Auth = AuthError;
	export const Market = MarketError;
}

export default Errors;
