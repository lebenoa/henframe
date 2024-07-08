<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import { search } from "$lib/nhql/api";
	import { title } from "$lib/stores/title.svelte";
	import { page } from "$app/stores";
	import type { APISearchResponse } from "$lib/nhql/types";
	import SpinnerContainer from "$lib/components/SpinnerContainer.svelte";
	import ErrorDisplay from "$lib/components/ErrorDisplay.svelte";

	let q = $state("");
	let qp = $state(1);
	let hasPreviousPage = $state(false);

	$effect(() => {
		q = $page.url.searchParams.get("q") || "";
		qp = parseInt($page.url.searchParams.get("page") || "1");
		hasPreviousPage = qp > 1;
	});

	async function fetchData(): Promise<APISearchResponse> {
		if (!q) throw new Error("No query provided");

		let terms = ["englis"];

		if (q.includes(",")) {
			let qterms = q.split(",").map((q) => q.trim());

			if (qterms.includes("english")) {
				terms = qterms;
			} else if (qterms.includes("-english")) {
				qterms.splice(qterms.indexOf("-english"), 1);
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

		const searchResult = search(terms, qp, fetch);

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
	<div class="grid grid-cols-3 gap-1 py-4">
		<a
			class="block w-full {!hasPreviousPage
				? 'pointer-events-none bg-red-400 text-gray-600'
				: 'bg-cyan-400'} px-4 py-2 text-center text-zinc-900"
			href="/search?q={q}&page={qp - 1}"
			onclick={(e) => {
				if (!hasPreviousPage) e.preventDefault();
			}}
		>
			Previous Page
		</a>

		<p class="flex w-full items-center justify-center border border-gray-500">
			Current Page: {qp}
		</p>

		<a
			class="block w-full bg-cyan-400 px-4 py-2 text-center text-zinc-900"
			href="/search?q={q}&page={qp + 1}"
		>
			Try Next Page
		</a>
	</div>
{:catch error}
	<ErrorDisplay {error} />
{/await}
