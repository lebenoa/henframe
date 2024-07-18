import type { APIByResponse, APISearchResponse } from "./types";

export const API_ENDPOINT = "https://api.hifumin.app/v1/graphql";

export async function getByID(
    id: number,
    fetcher: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
): Promise<APIByResponse> {
    let requestBody = {
        operationName: "getByID",
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
							metadata {
								tags {
									name
								}
								artists {
									name
								}
								parodies {
									name
								}
								characters {
									name
								}
							}
							images {
								pages {
									link
                                    info {
                                        height
                                    }
								}
							}
						}
					} 
				}
			}`
    };

    let result = await fetcher(API_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    return result.json();
}

export async function search(
    inc: string[],
    pg: number,
    fetcher: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
): Promise<APISearchResponse> {
    let requestBody = {
        operationName: "searchFor",
        variables: { inc, pg },
        query: `query searchFor($inc: [String]!, $pg: Int!) {
				nhql {
					search(includes: $inc, page: $pg) {
						success
						total
						data {
							id
							title {
								display
							}
							metadata {
								artists {
									name
								}
							}
							images {
								cover {
									link
                                    info {
                                        height
                                    }
								}
							}
						}
					} 
				}
			}`
    };

    let result = await fetcher(API_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    return result.json();
}
