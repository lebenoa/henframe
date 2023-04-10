<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;

	import { lazyLoad } from './lazyload';

	$: ({ result } = data);

	let showInfo = false;
</script>

<svelte:head>
	{#if result.success}
		<title>{result.data.title.display}</title>
	{/if}
</svelte:head>

{#if result.success}
	<div class="container">
		<button on:click={() => (showInfo = !showInfo)}>Toggle Information</button>
		{#if showInfo}
			<div class="container" transition:fly={{ x: -300 }}>
				<div class="item">
					<h3>Tags</h3>
					{#each result.data.metadata.tags as { name }, idx}
						<a href="/search/{name}/1" class="tag line">{name}</a>
						{#if (idx + 1) % 3 == 0}
							<br />
						{/if}
					{/each}
				</div>

				{#if result.data.metadata.artists.length > 0}
					<div class="item">
						<h3>Artists</h3>
						{#each result.data.metadata.artists as { name }, idx}
							<a href="/search/{name}/1" class="tag line">{name}</a>
						{/each}
					</div>
				{/if}

				{#if result.data.metadata.parodies.length > 0}
					<div class="item">
						<h3>Parodies</h3>
						{#each result.data.metadata.parodies as { name }, idx}
							<a href="/search/{name}/1" class="tag line">{name}</a>
						{/each}
					</div>
				{/if}

				{#if result.data.metadata.characters.length > 0}
					<div class="item">
						<h3>Characters</h3>
						{#each result.data.metadata.characters as { name }, idx}
							<a href="/search/{name}/1" class="tag line">{name}</a>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
		{#each result.data.images.pages as res}
			<img alt={res.link} referrerpolicy="same-origin" use:lazyLoad={res.link} />
		{/each}
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		text-align: center;
	}

	.item:last-child {
		margin-bottom: 1rem;
	}

	.item h3 {
		margin: 0.5rem 0;
	}

	.item .line {
		display: inline-flex;
		margin: 0.2rem 0.2rem;
	}

	.item .tag {
		padding: 0.33rem 0.44rem;
		background-color: rgb(12, 12, 12);
		border: 1px solid white;
	}

	button {
		padding: 0.8rem 1rem;
		border: 1px solid cyan;
		background-color: transparent;
		color: cyan;
		transition: 0.3s;
		margin: 0.5rem 0;
	}

	@media (min-width: 768px) {
		button:hover {
			background-color: cyan;
			color: black;
		}
	}

	@media (max-width: 768px) {
		button:active {
			background-color: cyan;
			color: black;
		}
	}

	img {
		max-width: 90%;
		max-height: 100%;
		margin: 0;
		padding: 0;
		transition: all 0.3s;
	}

	@media (max-width: 768px) {
		img {
			width: 100%;
			max-width: 100%;
		}
	}
</style>
