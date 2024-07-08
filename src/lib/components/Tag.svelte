<script lang="ts">
	import type { NhqlTag } from "$lib/nhql/types";

	type Props = {
		title: string;
		data: NhqlTag[];
	};

	let { title, data }: Props = $props();
</script>

<h3 class="mx-2 text-center text-xl">{title}</h3>
<div class="flex flex-row flex-wrap justify-center">
	{#each data as { name }}
		<a
			href="/search?q={name}"
			class="m-1 inline-flex border border-orange-500 bg-black px-2 py-1"
		>
			{name}
		</a>
	{/each}
</div>
