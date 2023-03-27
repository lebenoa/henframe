<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import Card from '$lib/components/card.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Chicked Frame as opposed to War Frame KEKW" />
</svelte:head>

<div class="container">
	{#each data.result.data as res}
		<Card
			id={res.id}
			title={res.title.display}
			width={res.images.cover.info.width}
			height={res.images.cover.info.height}
			link={res.images.cover.link}
		/>
	{/each}
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
