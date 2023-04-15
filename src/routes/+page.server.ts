import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const term = data.get('term');

        if (term) {
            throw redirect(308, `/search/${term}/1`);
        }
    }
};
