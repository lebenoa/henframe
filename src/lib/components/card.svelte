<script lang="ts">
	import { goto } from "$app/navigation";

	export let info: Nhql;

	import type { Nhql } from "$lib/nhql/types";
</script>

<button
	class="flex h-fit w-full flex-col border border-orange-500 !bg-opacity-50 transition-colors active:bg-orange-500 lg:hover:bg-orange-500"
	on:click={() => {
		goto(`/read?id=${info.id}`);
	}}
>
	<!-- svelte-ignore a11y_missing_attribute -->
	<img class="min-w-full min-h-full bg-cyan-800" src={info.images.cover.link} referrerpolicy="same-origin" loading="lazy" />
	<div class="w-full px-2 py-1">
		<p>{info.title.display}</p>
		<p class="{info.metadata.artists.length > 0 ? 'text-cyan-500' : 'text-red-500'}">
			[{info.metadata.artists.length > 0 ? info.metadata.artists.map((artist) => artist.name).join(", ") : "Unknown Artist"}]
		</p>
	</div>
</button>
