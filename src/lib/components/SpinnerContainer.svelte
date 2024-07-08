<script lang="ts">
	let { size = 48, color = "white" } = $props();

	import Spinner from "./icons/Spinner.svelte";
</script>

<div class="flex h-full w-full items-center justify-center">
	<Spinner {size} {color} />
</div>
