<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import HeaderSelectCheckbox from '$lib/components/table/cells/HeaderSelectCheckbox.svelte';
	import RowExpandToggle from '$lib/components/table/cells/RowExpandToggle.svelte';
	import RowSelectCheckbox from '$lib/components/table/cells/RowSelectCheckbox.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { createSelectedRowsStore } from '$lib/components/table/stores/selectedRowsStore.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import ExpandableRow from './_components/ExpandableRow.svelte';
	import RatingCell from './_components/RatingCell.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import TitleHeaderCell from './_components/TitleHeaderCell.svelte';
	import { writable } from 'svelte/store';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import CustomRowExpandToggle from './_components/custom-row-expand/CustomRowExpandToggle.svelte';

	let search = writable('');
	let selectedRows = createSelectedRowsStore([]);

	let perPage = 10;
	let page = 1;

	$: query = createQuery({
		queryKey: ['products', page, perPage, $search],
		queryFn: async () => {
			return await fetch(
				`https://dummyjson.com/products/search?q=${$search}&limit=${perPage}&skip=${page * perPage - perPage}`
			).then((res) => res.json());
		},
		placeholderData: (): Response => {
			return $query?.data || { limit: 10, skip: 0, total: 1, products: [] };
		}
	});

	// When you implement search or custom filtering it is important to handle situations where user can be on for example page 10, he searches for something
	// and only 1 page become available. Page wont change automatically in this situation. Just add line as below to provide reactivity. Page is automatically calculated only when user change limit or page.
	$: (page = 1), $search;

	let enableFullscreenMode = true;
	let enableVirtualization = false;
	let enableSorting = true;
	let enableResizing = true;
	let enablePagination = true;
	let enableColumnReordering = true;
	let enableColumnVisiblitySelect = true;
	let enableActions = true;
	let enableExpandableRow = writable(true);

	let columns: Columns = [
		{
			accessor: 'expanded',
			header: '',
			cell: CustomRowExpandToggle,
			config: {
				sortable: false,
				resizable: true,
				size: {
					w: 45
				}
			},
			extra: {
				enableExpandableRow
			}
		},
		{
			accessor: '',
			header: '',
			config: {
				sortable: false,
				align: 'center',
				resizable: false,
				size: {
					w: 30
				}
			},
			cell: RowSelectCheckbox,
			cellEdit: RowSelectCheckbox,
			headerCell: HeaderSelectCheckbox
		},
		{
			accessor: 'id',
			header: 'Id',
			config: {
				size: {
					w: 40,
					minW: 40,
					maxW: 200
				},
				resizable: false
			}
		},
		{
			accessor: 'title',
			header: 'Name',
			headerCell: TitleHeaderCell,
			config: {
				sortable: false,
				size: {
					w: 200,
					minW: 60,
					maxW: 200
				}
			},
			extra: {
				search
			}
		},
		{
			accessor: 'description',
			header: 'Description',
			config: {
				size: {
					w: 300,
					minW: 60,
					maxW: 500
				}
			}
		},
		{
			accessor: 'rating',
			header: 'Rating',
			cell: RatingCell,
			config: {
				size: {
					w: 40,
					minW: 40,
					maxW: 200
				}
			}
		}
	];

	let ogCols = columns;

	const hideExpandedColumn = () => {
		if ($enableExpandableRow) {
			columns = columns.filter((c) => c.accessor != 'expanded');
		} else {
			columns = ogCols;
		}
	};
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">TZEZAR's Table</h1>
<h2
	class="mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>
	Table component built in svelte based on shadcn-svelte components.
</h2>

<div class="flex flex-row flex-wrap gap-2 py-2">
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableVirtualization = !enableVirtualization;
		}}>{enableVirtualization ? 'Disable virtualization' : 'Enable virtualization'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableFullscreenMode = !enableFullscreenMode;
		}}>{enableFullscreenMode ? 'Disable fullscreen mode' : 'Enable fullscreen mode'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			hideExpandedColumn();
			$enableExpandableRow = !$enableExpandableRow;
		}}>{$enableExpandableRow ? 'Disable expandable rows' : 'Enable expandable rows'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableActions = !enableActions;
		}}>{enableActions ? 'Disable actions' : 'Enable actions'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableColumnVisiblitySelect = !enableColumnVisiblitySelect;
		}}>{enableColumnVisiblitySelect ? 'Disable column hiding' : 'Enable column hiding'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableColumnReordering = !enableColumnReordering;
		}}>{enableColumnReordering ? 'Disable column reordering' : 'Enable column reordering'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enablePagination = !enablePagination;
		}}>{enablePagination ? 'Disable pagination' : 'Enable pagination'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableResizing = !enableResizing;
		}}>{enableResizing ? 'Disable resizing' : 'Enable resizing'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableSorting = !enableSorting;
		}}>{enableSorting ? 'Disable sorting' : 'Enable sorting'}</Button
	>
</div>

<Separator class="my-2" />

<Table
	data={$query?.data?.products || []}
	{columns}
	{enableColumnReordering}
	{enableColumnVisiblitySelect}
	{enablePagination}
	{enableResizing}
	{enableSorting}
	{enableVirtualization}
	{enableFullscreenMode}
	bind:selectedRows
	bind:perPage
	bind:page
	count={$query.data?.total || 1}
>
	<div slot="actions">
		{#if enableActions}
			<div class="flex flex-row gap-2">
				<Input bind:value={$search} />
				<div>
					<Sheet.Root>
						<Sheet.Trigger>
							<Button>Create record</Button>
						</Sheet.Trigger>
						<Sheet.Content>
							<Sheet.Header>
								<Sheet.Title>Create product form</Sheet.Title>
								<Sheet.Description class="flex flex-col gap-2">
									<Input disabled />
									<Button disabled>Submit</Button>
								</Sheet.Description>
							</Sheet.Header>
						</Sheet.Content>
					</Sheet.Root>
				</div>
				<Button variant="destructive" disabled={$selectedRows.length < 1}>Delete</Button>
			</div>
		{/if}
	</div>

	<div slot="filters"></div>
	<div slot="expandedRowContent" let:props>
		{#if $enableExpandableRow}
			<ExpandableRow {props} />
		{/if}
	</div>
</Table>
<p class="text-right text-foreground/50">
	Sorting is not working in the example because dummyjson.com does not support it
</p>

<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight">What is this?</h4>
<p class="pb-6 leading-7">
	I entrust to you a modest component, crafted atop the robust shadcn-svelte library, utilizing
	built-in svelte functions such as stores, among others. Every aspect of the table - its
	aesthetics, functionality, and beyond - can be customized to your heart's content. This serves as
	an excellent foundation to tailor a solution precisely to your requirements. If a component or
	basic solution doesn't quite align with your vision, fear not - mold it to your liking!
</p>

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">For whom?</h4>
<p class="pb-6 leading-7">
	The component efficiently manages server-side data (with client-side capability coming soon). It's
	designed for seamless extension with extra features, and styling integration should pose no major
	challenges. If you're already leveraging shadcn-svelte and tailwind, incorporating this component
	into your workflow is a natural fit.
</p>
<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Genesis</h4>
<p class="pb-6 leading-7">
	This project started as a way for me to make warehouse operations smoother with dynamic table
	displays. Despite trying options like ag-grid and headless solutions, none quite fit the bill.
	'Full' solutions were tough to customize, and headless ones like tanstack-table had tricky
	documentation. Dealing with remote data was also a hassle. So, TZEZAR's TABLE (pronounced like
	'Caesar') was born to bridge the gap, offering flexibility. Feel free to tweak this component to
	suit your needs!
</p>

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Currently Supported Functions</h4>
<ul class="ml-6 list-disc pb-6 [&>li]:mt-2">
	<li>Column Hiding</li>
	<li>Column Reordering</li>
	<li>Column Resizing</li>
	<li>Conditional Styling</li>
	<li>Content Alignment</li>
	<li>Custom Content</li>
	<li>Pagination</li>
	<li>Inline Row Editing</li>
	<li>Modal Row Editing</li>
	<li>Row Editing</li>
	<li>Row Expanding</li>
	<li>Single Column Sorting</li>
</ul>
<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Planned Functions</h4>
<ul class="ml-6 list-disc pb-6 [&>li]:mt-2">
	<li>Client-Side Functionality</li>
	<li>
		<p class="text-green-500">Virtualization</p>
		<p class="text-muted-foreground">Added 21/03/2024</p>
	</li>
	<li>
		<p class="text-green-500">Fullscreen Mode</p>
		<p class="text-muted-foreground">Cell Density Adjustment</p>
	</li>
</ul>
<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Not Planned for Immediate Addition</h4>
<ul class="ml-6 list-disc pb-6 [&>li]:mt-2">
	<li>Aggregation and Grouping</li>
	<li>Column Pinning</li>
</ul>
<p class="pb-6 leading-7">
	If you spot any missing features, don't worry! Adding them should be a breeze. Feel free to
	suggest ideas or improvements, and let's work together to make our component even better. Your
	input is always welcome, and together, we can create something truly outstanding!
</p>

<p class="self-center pb-6 italic">
	If you find the project interesting feel free to give a star on <a
		href="https://github.com/530RGE/table">github</a
	>. Thanks! ❤️
</p>
