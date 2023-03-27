// @ts-nocheck

import { redirect } from "@sveltejs/kit";

export const actions = {
	search: async ({ request }) => {
		const data = await request.formData();
        throw redirect(308, `/search/${data.get('term')}/1`)
	}
};
