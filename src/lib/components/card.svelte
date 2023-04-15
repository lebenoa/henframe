<script lang="ts">
    import { lazyLoad } from '$lib/lazyload';
    import { fade } from 'svelte/transition';

    export let id: number;
    export let title: string;
    export let width: number;
    export let height: number;
    export let link: string;
</script>

<a
    href="/view/{id}"
    class="container"
    style="width: {width}px;"
    transition:fade
    data-sveltekit-preload-data="off"
>
    <h2>{title}</h2>
    <img {width} {height} use:lazyLoad={link} alt={link} referrerpolicy="same-origin" />
</a>

<style>
    h2 {
        margin: 0.7rem;
    }

    .container {
        border: 1px solid white;
        margin: 0.5rem;
    }
</style>
