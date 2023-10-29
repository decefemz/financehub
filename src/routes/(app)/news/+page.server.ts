import Services from '$lib/services';
import type { Action, Actions } from './$types';

const handler: Action = async ({ fetch, request, cookies, getClientAddress }) => {
	const formData = await request.formData();
	
	try {
		const articles = await Services.getLinkedArticles({limit:10, country:"zw"});
		return { articles };
	} catch (err) {
		return { articles: [] };
	}
};

export const actions: Actions = {
	default: handler
};
