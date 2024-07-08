<script lang="ts">
	import type { Nhql } from "$lib/nhql/types";

	// This is way easier than svelte 5 with typescript enabled. Cleaner, Simpler, Easier.
	// Though might be deprecated in the future
	export let info: Nhql;

	let hasArtists = info.metadata.artists.length > 0;
</script>

<a
	href="/read?id={info.id}"
	class="flex w-full flex-col border border-slate-500 !bg-opacity-50 transition-colors active:bg-slate-500 lg:hover:bg-slate-500"
>
	<!-- svelte-ignore a11y_missing_attribute -->
	<img
		class="bg-cyan-800 my-auto"
		src={info.images.cover.link}
		alt={info.title.display}
		referrerpolicy="same-origin"
		loading="lazy"
	/>
	<div class="w-full px-2 py-1 text-center">
		<p>{info.title.display}</p>
		<p class={hasArtists ? "text-cyan-500" : "text-red-500"}>
			[{hasArtists
				? info.metadata.artists.map((artist) => artist.name).join(", ")
				: "Unknown Artist"}]
		</p>
	</div>
</a>
