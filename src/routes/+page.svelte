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

	let columns: Columns = [
		{
			accessor: 'expanded',
			header: '',
			cell: RowExpandToggle,
			config: {
				sortable: false,
				resizable: true,
				size: {
					w: 45
				}
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
			config: {
				size: {
					w: 160,
					minW: 60,
					maxW: 200
				}
			}
		},
		{
			accessor: 'description',
			header: 'Description',
			config: {
				size: {
					w: 200,
					minW: 60,
					maxW: 300
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
	$: query = createQuery({
		queryKey: ['products', page, perPage, search],
		queryFn: async () => {
			return await fetch(
				`https://dummyjson.com/products/search?q=${search}&limit=${perPage}&skip=${page * perPage - perPage}`
			).then((res) => res.json());
		},
		placeholderData: (): Response => {
			return $query?.data || { limit: 10, skip: 0, total: 1, products: [] };
		}
	});

	let selectedRows = createSelectedRowsStore([]);

	let perPage = 10;
	let page = 1;

	let search = '';

	// When you implement search or custom filtering it is important to handle situations where user can be on for example page 10, he searches for something
	// and only 1 page become available. Page wont change automatically in this situation. Just add line as below to provide reactivity. Page is automatically calculated only when user change limit or page.
	$: (page = 1), search;
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">530RGE Table</h1>
<h2
	class="mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>
	Table component built in svelte based on shadcn-svelte components.
</h2>

<Table
	data={$query?.data?.products || []}
	{columns}
	enableColumnReordering
	enableColumnVisiblitySelect
	enablePagination
	enableResizing
	enableSorting
	bind:selectedRows
	bind:perPage
	bind:page
	count={$query.data?.total || 1}
>
	<div slot="actions">
		<div class="flex flex-row gap-2">
			<Input bind:value={search} />
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
	</div>
	<div slot="filters"></div>
	<div slot="expandedRowContent" let:props>
		<ExpandableRow {props} />
	</div>
</Table>
<p class="text-right text-foreground/50">
	Sorting is not working in the example because dummyjson.com does not support it
</p>




<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight">What is this?</h4>
<p class="pb-6 leading-7">
	I put into your hands just the merest component built on top of the great shadcn-svelte library
	and built-in svelte functions like stores etc. You can change every part of the table - its
	appearance, logic etc. This can be a great basis to build something that fits your needs
	perfectly. Doesn't a component or basic solution suit you? Change it as you like!
</p>

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">For whom?</h4>
<p class="pb-6 leading-7">
	The component handles data from the server (client side soon). It's easy to extend with additional features, styling
	shouldn't be difficult either. Use it if you already use shadcn-svelte and tailwind.
</p>
<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Genesis</h4>
<p class="pb-6 leading-7">
	The genesis of the project was a personal project to operate a warehouse where a multitude of
	different tables needed to be displayed. I tested various solutions such as the ag grid or reached
	for headless solutions, but no solution suited me. The ready-made 'full' solutions, so to speak,
	were hard to adapt to my needs, and headless like tanstack-table - they seem to be mega-flexible,
	but I struggled to add my own solutions (perhaps because the documentation was quite difficult to
	understand). Headless worked very well with client side data, but working with remote data was no
	longer so straightforward. This is how the 530RGE table (pronounced 'george') came about.
</p>
<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Important note</h4>
<p class="pb-6 leading-7">
	I won't hide - I'm not some veteran programmer. Although the origins of my work with code date
	back to 2017, my knowledge is scattered and unfocused only on the frontend. I write solutions for
	my companies, so you could call me a jack of all trades and master of none. Programming is my
	passion. I decided to make this 'package' public to contribute a little bit to open - source
	projects, because I used them a lot. I have put a lot of time and heart into building this
	component, but I am aware that it may not meet the code quality requirements of some people. I
	recommend checking out github and the source code first - it will literally take a while to
	understand it and you will see if this component is suitable for your needs.
</p>

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Supported functions</h4>
<ul class="ml-6 list-disc pb-6 [&>li]:mt-2">
	<li>Column hiding</li>
	<li>Column reordering</li>
	<li>Column resizing</li>
	<li>Conditonal styling</li>
	<li>Content align</li>
	<li>Custom content</li>
	<li>Pagination</li>
	<li>Inline row editing</li>
	<li>Modal row editing</li>
	<li>Row editing</li>
	<li>Row expanding</li>
	<li>Single column sorting</li>
</ul>

<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Planned functions</h4>
<ul class="ml-6 list-disc pb-6 [&>li]:mt-2">
	<li>Client side functionality</li>
	<li>Virtualization</li>
	<li>Fullscreen</li>
	<li>Cell density</li>
</ul>
<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">What wont be added soon</h4>
<ul class="ml-6 list-disc pb-6 [&>li]:mt-2">
	<li>Aggregation and grouping</li>
	<li>Column pinning</li>
</ul>

<p class="self-center pb-6 italic">
	If you find the project interesting feel free to give a star on <a
		href="https://github.com/530RGE/table">github</a
	>. Thanks! ❤️
</p>
