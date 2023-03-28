<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ result } = data);

	import Card from '$lib/components/card.svelte';
	import { page } from '$app/stores';

	$: currentPage = parseInt($page.params.page);

	$: previousPage = currentPage == 1 ? 1 : currentPage - 1;
	$: nextPage = result.success
		? currentPage == Math.floor(result.total / 25) + 1
			? currentPage
			: currentPage + 1
		: currentPage + 1;
</script>

<svelte:head>
	{#if result.success && $page.params.term}
		<title>{$page.params.term.toUpperCase()} | Search</title>
	{/if}
</svelte:head>

{#if result.success}
	<h1>Found {result.total} items</h1>
	<div class="container">
		{#each result.data as res}
			<Card
				id={res.id}
				title={res.title.display}
				width={res.images.cover.info.width}
				height={res.images.cover.info.height}
				link={res.images.cover.link}
			/>
		{/each}
	</div>
	<div class="container">
		<a href="/search/{$page.params.term}/{previousPage}">Previous Page</a>
		<a href="/search/{$page.params.term}/{nextPage}">Next Page</a>
	</div>
{/if}

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}

    a {
        padding: 1rem;
        border: 1px solid red;
        margin: auto;
        transition: .3s;
    }

    a:hover {
        background: red;
        color: white;
        text-decoration: none;
    }
</style>
