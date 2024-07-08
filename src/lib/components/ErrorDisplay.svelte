<script>
    let { error: ERROR } = $props();
</script>

<article class="prose prose-pink w-full h-full mx-auto text-center">
    <h1>Something went wrong</h1>
    <h3>{ERROR}</h3>
</article>