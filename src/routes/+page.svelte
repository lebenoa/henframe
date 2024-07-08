<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import SpinnerContainer from "$lib/components/SpinnerContainer.svelte";
	import { search } from "$lib/nhql/api";
	import { title } from "$lib/stores/title.svelte";
	import type { APISearchResponse } from "$lib/nhql/types";

	async function fetchData(): Promise<APISearchResponse> {
		return search(["englis"], 1, fetch);
	}

	title.title = "Henframe";
</script>

{#await fetchData()}
	<SpinnerContainer />
{:then data}
	<div class="grid grid-cols-2 gap-x-1 gap-y-3 lg:grid-cols-5">
		{#each data.data.nhql.search.data as info}
			<Card {info} />
		{/each}
	</div>
{/await}
