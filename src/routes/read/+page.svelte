<script lang="ts">
	import SpinnerContainer from "$lib/components/SpinnerContainer.svelte";
	import Spinner from "$lib/components/icons/Spinner.svelte";

	import { getByID } from "$lib/nhql/api";
	import type { Nhresponse } from "$lib/nhql/types";

	import { page } from "$app/stores";
	import { fly } from "svelte/transition";
	import { title } from "$lib/stores/title.svelte";
	import { settings } from "$lib/stores/settings.svelte";
	import { loadImg } from "$lib/load-img";
	import Tag from "$lib/components/Tag.svelte";

	let id = $state("");

	$effect(() => {
		id = $page.url.searchParams.get("id") || "";
	});

	async function fetchData(): Promise<Nhresponse> {
		if (!id) throw new Error("No ID provided");
		if (!/^\d+$/.test(id)) throw new Error("Invalid ID provided");

		const response = await getByID(parseInt(id), fetch);

		title.title = `${response.data.nhql.by.data.title.display} | Henframe`;

		return response.data.nhql.by;
	}

	let showInfo = $state(false);
</script>

{#await fetchData()}
	<SpinnerContainer />
{:then data}
	<div class="flex flex-col">
		<button
			class="border border-cyan-500 p-2 transition-colors active:bg-cyan-500 lg:hover:bg-cyan-500"
			onclick={() => (showInfo = !showInfo)}
		>
			{showInfo ? "Hide" : "Show"} Info
		</button>
		{#if showInfo}
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
		{#each data.data.images.pages as res}
			<img
				class="bg-cyan-800"
				alt={res.link}
				src={res.link}
				style="margin: {settings.yMargin}rem {settings.xMargin}rem"
				referrerpolicy="same-origin"
				loading="lazy"
				onerror={(e) => {
					const node = e.target as HTMLImageElement;
					const retryButton = document.createElement("button");

					retryButton.innerText = "Retry Image";
					retryButton.className =
						"border border-red-500 w-full p-4 my-1 transition-colors active:bg-red-500 lg:hover:bg-red-500";

					retryButton.addEventListener("click", () => {
						const newImg = document.createElement("img");

						for (const attr of node.attributes) {
							if (attr.name === "src") {
								newImg.setAttribute(
									attr.name,
									attr.value + "?t=" + new Date().getTime()
								);
							} else {
								newImg.setAttribute(attr.name, attr.value);
							}
						}

						retryButton.replaceWith(newImg);
					});

					node.replaceWith(retryButton);
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
	<h2 class="text-xl">Something went wrong</h2>
	<p>{error}</p>
{/await}
