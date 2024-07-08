<script lang="ts">
	import type { Nhql } from "$lib/nhql/types";

	// This is way easier than svelte 5 with typescript enabled. Cleaner, Simpler, Easier.
	// Though might be deprecated in the future
	export let info: Nhql;
</script>

<a
	href="/read?id={info.id}"
	class="flex h-fit w-full flex-col border border-orange-500 !bg-opacity-50 transition-colors active:bg-orange-500 lg:hover:bg-orange-500"
>
	<!-- svelte-ignore a11y_missing_attribute -->
	<img
		class="min-h-full min-w-full bg-cyan-800"
		src={info.images.cover.link}
		referrerpolicy="same-origin"
		loading="lazy"
	/>
	<div class="w-full px-2 py-1">
		<p>{info.title.display}</p>
		<p class={info.metadata.artists.length > 0 ? "text-cyan-500" : "text-red-500"}>
			[{info.metadata.artists.length > 0
				? info.metadata.artists.map((artist) => artist.name).join(", ")
				: "Unknown Artist"}]
		</p>
	</div>
</a>
