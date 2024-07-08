<script lang="ts">
	type Props = {
		children: () => any;
		class?: string;
		[key: string]: any;
	};

	let { children, class: CLASS = "", ...props }: Props = $props();
</script>

<button
	class="flex flex-col items-center justify-center px-5 py-2 transition-colors active:bg-slate-500 lg:hover:bg-slate-500{CLASS !==
	''
		? ' ' + CLASS
		: ''}"
	{...props}
>
	{@render children()}
</button>
