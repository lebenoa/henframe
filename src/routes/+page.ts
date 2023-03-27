import type { PageLoad } from './$types';
import { API_ENDPOINT } from '$lib/nhql/api';
import type { APISearchResponse } from '$lib/nhql/type';

export const load = (async ({ fetch }) => {
	let requestBody = {
		operationName: null,
		variables: {},
		query: `{
                nhql {
                    search(includes: ["english"]) {
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
