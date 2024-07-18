<script lang="ts">
	import SpinnerContainer from "$lib/components/SpinnerContainer.svelte";

	import { getByID } from "$lib/nhql/api";
	import type { Nhresponse } from "$lib/nhql/types";

	import { page } from "$app/stores";
	import { fly } from "svelte/transition";
	import { title } from "$lib/stores/title.svelte";
	import { settings } from "$lib/stores/settings.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import ErrorDisplay from "$lib/components/ErrorDisplay.svelte";
	import { trackThisImage } from "$lib/page-track";
	import { replaceState } from "$app/navigation";

	let id = $state("");
	let pageState: number = parseInt(new URL(window.location.href).searchParams.get("page") ?? "0");

	$effect(() => {
		id = $page.url.searchParams.get("id") || "";
	});

	async function fetchData(): Promise<Nhresponse> {
		if (!id) throw new Error("No ID provided");
		if (!/^\d+$/.test(id)) throw new Error(`Invalid ID (${id})`);

		const response = await getByID(parseInt(id), fetch);

		title.title = `${response.data.nhql.by.data.title.display} | Henframe`;

		return response.data.nhql.by;
	}
</script>

{#await fetchData()}
	<SpinnerContainer />
{:then data}
	<div class="flex flex-col">
		<button
			class="border border-cyan-500 p-2 transition-colors active:bg-cyan-500 lg:hover:bg-cyan-500"
			onclick={() => {
				replaceState("", {
					...$page.state,
					showInfo: !$page.state.showInfo
				});
			}}
		>
			{$page.state.showInfo ? "Hide" : "Show"} Info
		</button>
		{#if $page.state.showInfo}
			<div
				class="flex flex-col items-center justify-center px-10"
				transition:fly={{ x: -300, duration: 200 }}
			>
				{#if data.data.metadata.parodies.length > 0}
					<Tag title="Parodies" data={data.data.metadata.parodies} />
				{/if}

				{#if data.data.metadata.characters.length > 0}
					<Tag title="Characters" data={data.data.metadata.characters} />
				{/if}

				<Tag title="Tags" data={data.data.metadata.tags} />

				{#if data.data.metadata.artists.length > 0}
					<Tag title="Artists" data={data.data.metadata.artists} />
				{/if}
			</div>
		{/if}
	</div>
	<div class="flex w-full flex-col justify-center">
		{#each data.data.images.pages as res, idx}
			<img
				class="bg-cyan-800"
				alt={res.link}
				src={res.link}
				style="margin: {settings.yMargin}rem {settings.xMargin}rem; min-height: {res.info
					.height}px"
				referrerpolicy="same-origin"
				loading={idx < (pageState > 2 ? pageState : 3) ? "eager" : "lazy"}
				use:trackThisImage={{ pageNumber: idx, queryNumber: pageState }}
				page-number={idx}
				onload={(e) => {
					(e.target as HTMLImageElement).style.minHeight = "auto";
				}}
				onerror={(e) => {
					(e.target as HTMLImageElement).setAttribute("data-load-error", "true");
				}}
			/>
			<!-- {@html `<img
				class="bg-cyan-800"
				alt="${res.link}"
				src="${res.link}"
				style="margin: ${settings.yMargin}rem ${settings.xMargin}rem"
				referrerpolicy="same-origin"
				loading="lazy"
				onerror="onImgError(this)"
			/>`} -->
			<!-- <div
				class="flex h-full min-h-14 w-full items-center justify-center"
				use:loadImg={{
					src: res.link,
					class: "bg-cyan-800 md:mx-60",
					alt: res.link,
					referrerpolicy: "same-origin",
					loading: "lazy",
				}}
			>
				<Spinner size={48} />
			</div> -->
		{/each}
	</div>
{:catch error}
	<ErrorDisplay {error} />
{/await}
