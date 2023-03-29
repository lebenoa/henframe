<script lang="ts">
    import type { PageData } from './$types';

	export let data: PageData;

    import { lazyLoad } from './lazyload';

	$: ({ result } = data);
</script>

<svelte:head>
    {#if result.success}
        <title>{result.data.title.display}</title>
    {/if}
</svelte:head>

{#if result.success}
    <div class="container">
        {#each result.data.images.pages as res}
            <img
                alt={res.link}
                referrerpolicy="same-origin"
                use:lazyLoad={res.link}
            />
        {/each}
    </div>
{/if}

<style>
    .container {
        text-align: center;
        width: 100%;
    }

    img {
        max-width: 100%;
        max-height: 100%;
        margin: 0;
        padding: 0;
        opacity: 0;
        transition: all .3s;
    }

    @media (max-width: 500px) {
        img {
            width: 100%;
        }
    }
</style>