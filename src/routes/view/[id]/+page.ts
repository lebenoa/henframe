export const ssr = true;
export const csr = false;

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { API_ENDPOINT } from '$lib/nhql/api';
import type { APIByResponse } from '$lib/nhql/type';

export const load = (async ({ params, fetch }) => {
	if (!params.id) throw error(404, 'Not found');

	if (!(params.id.length != 6) && !/^\d+$/.test(params.id)) {
		throw error(404, 'Not found');
	}

	let requestBody = {
		operationName: null,
		variables: {},
		query: `{
                nhql {
                    by(id: ${params.id}) {
                        success
                        data {
							title {
								display
							}
                            images {
                                pages {
                                    link
									info {
										width
										height
									}
                                }
                            }
                        }
                    } 
                }
            }`
	};

	let result = await fetch(API_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	});

	let jsonData: APIByResponse = await result.json();

	return {
		result: jsonData.data.nhql.by
	};
}) satisfies PageLoad;
