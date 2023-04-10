import type { APIByResponse } from './type';

export const API_ENDPOINT = 'https://api.hifumin.app/v1/graphql';

export async function getByID(id: number): Promise<APIByResponse> {
	let requestBody = {
		operationName: 'getByID',
		variables: { id },
		query: `
			query getByID($id: Int!) {
				nhql {
					by(id: $id) {
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

	return result.json();
}
