export const ssr = true;
export const csr = false;

import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { search } from '$lib/nhql/api';

export const load = (async ({ params, fetch }) => {
    if (!params.term) throw error(404, 'Not found');

    if (params.term.length == 6 && /^\d+$/.test(params.term)) {
        throw redirect(308, `/view/${params.term}`);
    }

    let term: string[];
    if (params.term.includes(',')) {
        term = params.term.split(',');

        for (let i = 0; i < term.length; i++) {
            term[i] = term[i].trim();
        }

        term.push('english');
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
