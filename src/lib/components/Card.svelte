<script lang="ts">
	import { replaceState } from "$app/navigation";
	import { page } from "$app/stores";
	import type { Nhql } from "$lib/nhql/types";
	import { scrollIf } from "$lib/scroll-if";

	type Props = {
		info: Nhql;
	};

	let { info }: Props = $props();

	let hasArtists = info.metadata.artists.length > 0;
</script>

<a
	href="/read?id={info.id}"
	class="flex w-full flex-col border border-slate-500 !bg-opacity-50 transition-colors active:bg-slate-500 lg:hover:bg-slate-500"
	onclick={() => {
		replaceState("", {
			id: info.id
		});
	}}
	use:scrollIf={info.id == $page.state.id}
>
	<!-- svelte-ignore a11y_missing_attribute -->
	<img
		class="my-auto bg-cyan-800"
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
