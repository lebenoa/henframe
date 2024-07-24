<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import SpinnerContainer from "$lib/components/SpinnerContainer.svelte";
	import { search } from "$lib/nhql/api";
	import { title } from "$lib/stores/title.svelte";
	import { settings } from "$lib/stores/settings.svelte";
	import type { APISearchResponse } from "$lib/nhql/types";

	async function fetchData(): Promise<APISearchResponse> {
		return search(["englis"], 1, fetch);
	}

	title.title = "Henframe";
</script>

{#await fetchData()}
	<SpinnerContainer />
{:then data}
	<div
		class="grid grid-cols-2 gap-x-1 gap-y-3 lg:grid-cols-5"
		style={settings.gridCols > 0
			? `grid-template-columns: repeat(${settings.gridCols}, minmax(0, 1fr));`
			: ""}
	>
		{#each data.data.nhql.search.data as info}
			<Card {info} />
		{/each}
	</div>
	<div class="grid grid-cols-3 gap-1 py-4">
		<a
			class="pointer-events-none block w-full bg-red-400 px-4 py-2 text-center text-gray-600"
			href="/"
		>
			Previous Page
		</a>

		<p class="flex w-full items-center justify-center border border-gray-500">
			Current Page: 1
		</p>

		<a
			class="block w-full bg-cyan-400 px-4 py-2 text-center text-zinc-900"
			href="/search?q=englis&page=2"
		>
			Try Next Page
		</a>
	</div>
{/await}
