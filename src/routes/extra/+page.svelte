<script lang="ts">
	import { fly } from "svelte/transition";
	import { settings } from "$lib/stores/settings.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import { trackThisImage } from "$lib/page-track";
	import { extraUrl } from "$lib/extra";

	let pageState: number = parseInt(new URL(window.location.href).searchParams.get("page") ?? "0");
</script>

<div class="flex w-full flex-col justify-center">
	{#each extraUrl as url, idx}
		<img
			class="bg-cyan-800"
			alt={url}
			src={url}
			style="margin: {settings.yMargin}rem {settings.xMargin}rem"
			referrerpolicy="same-origin"
			loading="lazy"
			use:trackThisImage={{ pageNumber: idx, queryNumber: pageState }}
			page-number={idx}
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
	{/each}
</div>
