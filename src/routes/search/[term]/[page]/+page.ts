import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { API_ENDPOINT } from '$lib/nhql/api';
import type { APISearchResponse } from '$lib/nhql/type';

export const load = (async ({ params, fetch }) => {
	if (!params.term) throw error(404, 'Not found');

	let term;
	if (params.term.includes(',')) {
		let termList = params.term.split(',');
		for (let i = 0; i < termList.length; i++) {
			let term = termList[i];
			termList[i] = term.trim();
		}
		termList.push('english');

		term = JSON.stringify(termList);
	} else if (params.term.length == 6 && /^\d+$/.test(params.term)) {
		throw redirect(308, `/view/${params.term}`);
	} else {
		term = `["${params.term}","english"]`;
	}

	let argument = `includes: ${term}`;
	if (params.page) {
		argument += `, page: ${params.page}`;
	}

	let requestBody = {
		operationName: null,
		variables: {},
		query: `{
                nhql {
                    search(${argument}) {
                        success
                        total
                        data {
                            id
                            title {
                                display
                            }
                            images {
                                cover {
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

	let jsonData: APISearchResponse = await result.json();

	return {
		result: jsonData.data.nhql.search
	};
}) satisfies PageLoad;
