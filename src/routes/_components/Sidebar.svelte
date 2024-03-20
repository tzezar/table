<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils.js';
	import { createTreeView } from '@melt-ui/svelte';
	import { setContext } from 'svelte';

	const ctx = createTreeView({
		defaultExpanded: ['lib-0', 'tree-0']
	});
	setContext('tree', ctx);

	const {
		elements: { tree }
	} = ctx;

	const treeItems = [
		{ title: 'Home', link: '/' },
		{ title: 'Installation', link: '/installation' },
		{ title: 'Basic', link: '/basic' },
		{ title: 'Column resizing', link: '/column-resizing' },
		{ title: 'Column ordering', link: '/column-ordering' },
		{ title: 'Column hiding', link: '/column-hiding' },
		{ title: 'Column filtering', link: '/column-filtering' },
		{ title: 'Pagination', link: '/pagination' },
		{ title: 'Sorting', link: '/sorting' },
		{ title: 'Custom cells', link: '/custom-cells' },
		{ title: 'Row selection', link: '/row-selection' },
		{ title: 'Row expanding', link: '/row-expanding' },
		{ title: 'Row inline editing', link: '/row-inline-editing' },
		{ title: 'Row inline editing save on click', link: '/row-inline-editing-save-on-click' },
		{ title: 'Row modal editing', link: '/row-modal-editing' },
		{ title: 'Content align', link: '/content-align' },
		{ title: 'Conditional styling', link: '/conditional-styling' },
		{ title: 'Planned', link: '/planned' },
	];
</script>

<div class="flex h-full w-full flex-col ">
	<ul class="flex h-full flex-col gap-2 bg-background/90 font-normal" {...$tree}>
		{#each treeItems as item}
			<a
				href={item.link}
				class={cn(
					'rounded-sm bg-foreground/[0.03] p-2 hover:bg-foreground/10',
					$page.url.pathname.includes(item.link) && 'bg-foreground/10'
				)}
			>
				{item.title}</a
			>
		{/each}
	</ul>
</div>
