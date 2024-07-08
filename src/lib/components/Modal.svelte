<script lang="ts">
	import { fade, scale } from "svelte/transition";

	type Props = {
		children: () => any;
		class: string;
		show: boolean;
	};

	let { children, class: CLASS = "", show = $bindable(false) }: Props = $props();
</script>

{#if show}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center backdrop-blur backdrop-brightness-50"
		onclick={() => (show = false)}
        transition:fade
	>
		<div
			transition:scale
			class="bg-black z-20{CLASS !== '' ? ' ' + CLASS : ''}"
			onclick={(e) => {
				e.stopPropagation();
			}}
		>
			{@render children()}
		</div>
	</div>
{/if}
