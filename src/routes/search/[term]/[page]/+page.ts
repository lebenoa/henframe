export const ssr = true;
export const csr = false;

import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { search } from '$lib/nhql/api';
import type { APISearchResponse } from '$lib/nhql/type';

export const load = (async ({ params, fetch }) => {
	if (!params.term) throw error(404, 'Not found');

	if (params.term.length == 6 && /^\d+$/.test(params.term)) {
		throw redirect(308, `/view/${params.term}`);
	}

	let term;
	if (params.term.includes(',')) {
		let termList = params.term.split(',');
		for (let i = 0; i < termList.length; i++) {
			termList[i] = termList[i].trim();
		}
		termList.push('english');

		term = termList;
	} else {
		term = [params.term, 'english'];
	}

	let pageNumber;
	try {
		pageNumber = parseInt(params.page);
	} catch {
		pageNumber = 1;
	}

	let jsonData = await search(term, pageNumber);

	return {
		result: jsonData.data.nhql.search
	};
}) satisfies PageLoad;
