<script>
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

	<label class="mb-2">
		<h2>X Margin</h2>
		<input
			class="w-full border border-slate-500 bg-slate-500 bg-opacity-45 p-1 text-white"
			type="number"
			bind:value={settings.xMargin}
		/>
	</label>
	<input type="range" min="0" max="100" bind:value={settings.xMargin} />

	<label class="mb-2">
		<h2>Y Margin</h2>
		<input
			class="w-full border border-slate-500 bg-slate-500 bg-opacity-45 p-1 text-white"
			type="number"
			bind:value={settings.yMargin}
		/>
	</label>
	<input type="range" min="0" max="100" bind:value={settings.yMargin} />

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
			class="flex px-5 py-2 flex-col items-center justify-center transition-colors active:bg-slate-500 lg:hover:bg-slate-500"
		>
			<House />
		</a>
		<form
			class="flex w-full flex-row items-center"
			onsubmit={(e) => {
				e.preventDefault();

				if (/^\d+$/.test(searchTerm)) {
					goto(`/read?id=${searchTerm}`);
				} else if (searchTerm.length > 0) {
					goto(`/search?q=${searchTerm}`);
				}
			}}
		>
			<input
				class="h-full w-full bg-slate-900 px-4 py-2 md:text-lg lg:text-xl"
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
