<script lang="ts">
    import type { PageData } from '../$types';

	export let data: PageData;

    // SOMEHOW this give me an error... but it's working so...
    // @ts-ignore
	$: ({ result } = data);
</script>

<svelte:head>
    <title>{result.success ? result.data.title.display : "Error"}</title>
</svelte:head>

{#if result.success}
    <div class="container">
        {#each result.data.images.pages as res}
            <img
                src={res.link}
                alt={res.link}
                referrerpolicy="same-origin"
            />
        {/each}
    </div>
{/if}

<style>
    .container {
        text-align: center;
        width: 100%;
    }

    @media (max-width: 500px) {
        img {
            width: 100%;
        }
    }
</style>