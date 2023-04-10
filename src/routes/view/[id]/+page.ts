export const ssr = false;
export const csr = true;

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getByID } from '$lib/nhql/api';

export const load = (async ({ params, fetch }) => {
    if (!params.id) throw error(404, 'Not found');
    else if (params.id.length == 6 && !/^\d+$/.test(params.id)) throw error(404, 'Not found');

    let jsonData = await getByID(parseInt(params.id));

    return {
        result: jsonData.data.nhql.by
    };
}) satisfies PageLoad;
