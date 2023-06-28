<script lang="ts">
    import { lazyLoad } from '$lib/lazyload';
    import { scale } from 'svelte/transition';

    export let id: number;
    export let title: string;
    export let width: number;
    export let height: number;
    export let link: string;
</script>

<a
    href="/view/{id}"
    class="container"
    in:scale
>
    <h2>{title}</h2>
    {#key link}
        <img
            {width}
            {height}
            use:lazyLoad={link}
            alt={link}
            referrerpolicy="same-origin"
            in:scale
        />
    {/key}
</a>

<style>
    h2 {
        margin: 0.7rem;
    }

    .container {
        width: 350px;
        border: 1px solid orangered;
        margin: 0.5rem;
        box-sizing: initial;
    }
</style>
