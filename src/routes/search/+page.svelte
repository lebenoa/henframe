<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import { search } from "$lib/nhql/api";
	import { page } from "$app/stores";
	import type { APISearchResponse } from "$lib/nhql/types";
	import SpinnerContainer from "$lib/components/SpinnerContainer.svelte";
	import { title } from "$lib/stores/title.svelte";

	let q: string = $state("");
	let qp = $state("");

	$effect(() => {
		q = $page.url.searchParams.get("q") || "";
		qp = $page.url.searchParams.get("page") || "";
	});

	async function fetchData(): Promise<APISearchResponse> {
		if (!q) throw new Error("No query provided");

		let terms: string[] = ["englis"];

		if (q.includes(",")) {
			let qterms = q.split(",").map((q) => q.trim());

			if (qterms.includes("english") || qterms.includes("-english")) {
				terms = qterms;
			} else {
				terms = terms.concat(qterms);
			}
		} else {
			let trimmed = q.trim();
			if (trimmed === "english") {
				terms = [q];
			} else {
				terms.push(trimmed);
			}
		}

		const searchResult = search(terms, qp ? parseInt(qp) : 1, fetch);

		title.title = `${q} | Henframe`;

		return searchResult;
	}
</script>

{#await fetchData()}
	<SpinnerContainer />
{:then data}
	<div class="grid grid-cols-2 gap-x-1 gap-y-3 lg:grid-cols-5">
		{#each data.data.nhql.search.data as info}
			<Card {info} />
		{/each}
	</div>
{:catch error}
	<h2 class="text-xl">Something went wrong</h2>
	<p>{error}</p>
{/await}
