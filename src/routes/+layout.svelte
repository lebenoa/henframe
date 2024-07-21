<script lang="ts">
	import "../app.css";

	let { children } = $props();

	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	import { title } from "$lib/stores/title.svelte";
	import { settings } from "$lib/stores/settings.svelte";
	import Button from "$lib/components/Button.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import Cog from "$lib/icons/Cog.svelte";
	import Search from "$lib/icons/Search.svelte";
	import House from "$lib/icons/House.svelte";
	import ChevronLeft from "$lib/icons/ChevronLeft.svelte";
	import ChevronRight from "$lib/icons/ChevronRight.svelte";

	let searchTerm = $state("");
	let showModal = $state(false);

	$effect(() => {
		searchTerm = $page.url.searchParams.get("q") || searchTerm;
	});

	$effect(() => {
		if (!showModal) {
			settings.save();
		}
	});

	function inc(x: number) {
		return x + 0.5;
	}

	function dec(x: number) {
		if (x <= 0.5) return 0;
		return x - 0.5;
	}
</script>

<svelte:head>
	<title>{title.title}</title>
</svelte:head>

<Modal bind:show={showModal} class="prose prose-pink relative flex w-3/4 flex-col p-10 lg:w-1/3">
	<button
		class="absolute right-0 top-0 px-4 py-2 transition-colors lg:hover:text-white"
		onclick={() => (showModal = false)}>x</button
	>
	<h1 class="mb-0">Settings</h1>

	<label class="mb-2 w-full" for="gridCols">
		<h2 class="mb-0">Grid Columns</h2>
		<p>Number of columns in Home/Search page</p>
		<p>0 = auto</p>
	</label>

	<div class="flex w-full flex-row gap-1">
		<button
			class="border border-pink-500 px-4 py-2 text-pink-500 transition-colors active:bg-pink-500 active:text-black lg:hover:bg-pink-500 lg:hover:text-black"
			onclick={() => {
				if (settings.gridCols < 1) {
					settings.gridCols = 0;
				} else {
					settings.gridCols -= 1;
				}
			}}
		>
			<ChevronLeft />
		</button>
		<div class="flex h-full w-full flex-col">
			<input
				class="w-full border border-slate-500 bg-slate-500 bg-opacity-45 p-1 text-center text-white"
				type="number"
				id="gridCols"
				bind:value={settings.gridCols}
			/>
			<input class="w-full" type="range" min="0" max="10" bind:value={settings.gridCols} />
		</div>
		<button
			class="border border-pink-500 px-4 py-2 text-pink-500 transition-colors active:bg-pink-500 active:text-black lg:hover:bg-pink-500 lg:hover:text-black"
			onclick={() => (settings.gridCols += 1)}
		>
			<ChevronRight />
		</button>
	</div>

	<label class="mb-2 w-full" for="xMargin">
		<h2>Page's X-Axis Margin</h2>
	</label>

	<div class="flex w-full flex-row gap-1">
		<button
			class="border border-pink-500 px-4 py-2 text-pink-500 transition-colors active:bg-pink-500 active:text-black lg:hover:bg-pink-500 lg:hover:text-black"
			onclick={() => (settings.xMargin = dec(settings.xMargin))}
		>
			<ChevronLeft />
		</button>
		<div class="flex h-full w-full flex-col">
			<input
				class="w-full border border-slate-500 bg-slate-500 bg-opacity-45 p-1 text-center text-white"
				type="number"
				id="xMargin"
				step="0.5"
				bind:value={settings.xMargin}
			/>
			<input
				class="w-full"
				type="range"
				step="0.5"
				min="0"
				max="100"
				bind:value={settings.xMargin}
			/>
		</div>
		<button
			class="border border-pink-500 px-4 py-2 text-pink-500 transition-colors active:bg-pink-500 active:text-black lg:hover:bg-pink-500 lg:hover:text-black"
			onclick={() => (settings.xMargin = inc(settings.xMargin))}
		>
			<ChevronRight />
		</button>
	</div>

	<label class="mb-2 w-full" for="yMargin">
		<h2>Page's Y-Axis Margin</h2>
	</label>
	<div class="flex w-full flex-row gap-1">
		<button
			class="border border-pink-500 px-4 py-2 text-pink-500 transition-colors active:bg-pink-500 active:text-black lg:hover:bg-pink-500 lg:hover:text-black"
			onclick={() => (settings.yMargin = dec(settings.yMargin))}
		>
			<ChevronLeft />
		</button>
		<div class="flex h-full w-full flex-col">
			<input
				class="w-full border border-slate-500 bg-slate-500 bg-opacity-45 p-1 text-center text-white"
				type="number"
				id="yMargin"
				bind:value={settings.yMargin}
			/>
			<input
				class="w-full"
				type="range"
				step="0.5"
				min="0"
				max="100"
				bind:value={settings.yMargin}
			/>
		</div>
		<button
			class="border border-pink-500 px-4 py-2 text-pink-500 transition-colors active:bg-pink-500 active:text-black lg:hover:bg-pink-500 lg:hover:text-black"
			onclick={() => (settings.yMargin = inc(settings.yMargin))}
		>
			<ChevronRight />
		</button>
	</div>

	<button
		class="mt-8 border border-slate-500 p-2 text-slate-500 transition-colors active:bg-slate-500 active:text-white lg:hover:bg-slate-500 lg:hover:text-white"
		onclick={() => (showModal = false)}
	>
		Close
	</button>
</Modal>

<div class="flex h-full flex-col">
	<nav class="flex flex-row bg-black p-2 text-white">
		<a
			href="/"
			class="flex flex-col items-center justify-center px-5 py-2 transition-colors active:bg-slate-500 lg:hover:bg-slate-500"
		>
			<House />
		</a>
		<form
			class="flex w-full flex-row items-center"
			onsubmit={(e) => {
				e.preventDefault();

				if (/^\d+$/.test(searchTerm)) {
					goto(`/read?id=${searchTerm}`);
				} else if (searchTerm.startsWith("#")) {
					let trimmed = searchTerm.slice(1);
					if (/^\d+$/.test(trimmed)) {
						goto(`/read?id=${trimmed}`);
					}
				} else if (searchTerm.length > 0) {
					goto(`/search?q=${searchTerm}`);
				}
			}}
		>
			<input
				class="h-full w-full rounded-none bg-slate-900 px-4 py-2 md:text-lg lg:text-xl"
				type="search"
				placeholder="Search or code here"
				bind:value={searchTerm}
			/>
			<Button class="h-full" type="submit">
				<Search />
			</Button>
		</form>
		<Button class="h-full" onclick={() => (showModal = true)}>
			<Cog />
		</Button>
	</nav>

	<div class="h-full lg:p-2">
		{@render children()}
	</div>
</div>
