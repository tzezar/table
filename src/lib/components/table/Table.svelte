<script lang="ts">
	import { FolderX } from 'lucide-svelte';

	import { portalAction } from 'svelte-legos';
	import { setContext } from 'svelte';
	import { cn } from '$lib/utils.js';

	import Pagination from './components/Pagination.svelte';
	import ColumnVisibilitySelect from './components/ColumnVisibilitySelect.svelte';
	import SortingToggle from './components/SortingToggle.svelte';
	import CellTemplate from './components/CellTemplate.svelte';
	import CellEditableTemplate from './components/CellEditableTemplate.svelte';
	import FullscreenModeToggle from './components/FullscreenModeToggle.svelte';

	import { type ColumnClassNames, type Columns } from './index.js';

	import { createFullscreenModeStore } from './stores/fullscreenModeStore.js';
	import { createSelectedRowsStore } from './stores/selectedRowsStore.js';
	import { createVisibleRowsStore } from './stores/visibleRowsStore.js';
	import { createInlineEditingStore } from './stores/inlineEditingStore.js';
	import { createHiddenColumnsStore } from './stores/hiddenColumnsStore.js';
	import { createSortingStore } from './stores/sortingStore.js';
	import { createExpandedRowsStore } from './stores/expandedRowsStore.js';
	import { throttle } from '$lib/components/table/utils/throttle.js';
	import { createColumnSizesStore } from './stores/columnSizesStore.js';
	import ColumnOrderDraggableChanger from './components/ColumnOrderDraggableChanger.svelte';
	import { writable } from 'svelte/store';
	import { createVirtualizer } from '@tanstack/svelte-virtual';
	import { sortByPropertyName } from './utils/clientMode';
	import * as Table from '$lib/components/table/table';

	export let mode: 'server' | 'client' = 'server';
	export let loading = true;
	export let data: any[] = [];
	export let columns: Columns;

	// temporary made a store for column reordering
	$: columnsStore = writable(
		columns.map((c, i) => {
			return { ...c, id: i };
		})
	);
	export let page = 1;
	export let count: number = 1;
	export let perPage: number = 10;

	export let defaultColumnWidth = 100;

	export let classNames: ColumnClassNames = {
		row: () => '',
		cell: () => '',
		th: () => '',
		table: () => ''
	};

	export let sorting = createSortingStore({ accessor: '', direction: '' });
	export let hiddenColumns = createHiddenColumnsStore(
		columns.filter((c) => c.config?.visible == false).map((c) => c.accessor)
	);

	export let fullscreenMode = createFullscreenModeStore(false);
	export let inlineEditing = createInlineEditingStore([]);
	export let selectedRows = createSelectedRowsStore([]);
	export let visibleRows = createVisibleRowsStore(data);
	export let expandedRows = createExpandedRowsStore([]);
	export let minW: number = 35;
	export let maxW: number = 1000;

	$: if (mode == 'server') {
		visibleRows.set(data);
	}

	$: if (mode == 'client') {
		visibleRows.set(
			sortByPropertyName(data, $sorting.accessor, $sorting).slice(
				page * perPage - perPage,
				page * perPage
			)
		);
		count = data.length || 0;
		data;
		$sorting
	}

	export let columnSizes = createColumnSizesStore([]);
	$: $columnSizes = columns.map((c) => {
		return {
			accessor: c.accessor,
			w: c.config?.size?.w || defaultColumnWidth,
			minW: c.config?.size?.minW || minW,
			maxW: c.config?.size?.maxW || maxW
		};
	});

	setContext('table', {
		hiddenColumns,
		selectedRows,
		visibleRows,
		inlineEditing,
		expandedRows,
		sorting
	});

	export let enableFullscreenMode: boolean = false;
	export let enableColumnVisiblitySelect: boolean = false;
	export let enablePagination: boolean = false;
	export let enableSorting: boolean = false;
	export let enableResizing: boolean = false;
	export let enableColumnReordering: boolean = false;
	export let enableVirtualization: boolean = false;

	function resize(node: HTMLElement, options: any) {
		let { accessor } = options;
		let startX = 0;
		let startWidth = 0;

		const handleResize = (e: PointerEvent) => {
			startX = e.clientX;
			// @ts-ignore
			startWidth = $columnSizes.find((obj) => obj.accessor === accessor).w;
			document.addEventListener('pointermove', throttledHandleMouseMove);
			document.addEventListener('pointerup', handleMouseUp);
		};

		const handleMouseMove = (e: PointerEvent) => {
			const newValue = Math.max(startWidth + (e.clientX - startX), 0);
			columnSizes.update((items) => {
				const index = items.findIndex((item) => item.accessor === accessor);
				let newW = Math.max(newValue, $columnSizes[index].minW);
				newW = Math.min(newW, $columnSizes[index].maxW);

				if (index !== -1) {
					// Clone the array and the object to avoid mutating the original state
					const newArray = [...items];
					newArray[index] = { ...newArray[index], w: newW };
					return newArray;
				}
				return items;
			});
		};

		const handleMouseUp = () => {
			startX = 0;
			startWidth = 0;
			document.removeEventListener('pointermove', throttledHandleMouseMove);
			document.removeEventListener('pointerup', handleMouseUp);
		};

		let interval = perPage > 200 ? 50 : 0;
		const throttledHandleMouseMove = throttle(handleMouseMove, interval); // Adjust throttle interval as needed

		node.addEventListener('pointerdown', handleResize);

		return {
			destroy() {
				document.removeEventListener('pointerdown', handleResize);
				document.removeEventListener('pointermove', throttledHandleMouseMove);
				document.removeEventListener('pointerup', handleMouseUp);
			}
		};
	}

	// not 100% sure if vritualized rows without store will be all the time reactive
	// uncomment below and report bug if any error happens

	// let data = writable(data);
	// $: data.set(data);

	// VIRTUALIZATION
	let virtualListEl: HTMLDivElement;
	let virtualItemEls: HTMLDivElement[] = [];
	$: virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
		count: data.length,
		getScrollElement: () => virtualListEl,
		estimateSize: () => 44,
		overscan: 2
	});
	$: items = $virtualizer.getVirtualItems();
	$: {
		if (virtualItemEls.length) {
			virtualItemEls.forEach((el) => $virtualizer.measureElement(el));
		}
		$expandedRows;
	}

	// FULLSCREEN
	let target = writable('#tableContent');

</script>



<div id="tableContent">
	<div
		class={cn(
			'z-10 flex flex-col bg-background',
			$fullscreenMode ? 'absolute h-screen w-screen p-2' : 'flex h-full w-full flex-col'
		)}
		use:portalAction={$target}
	>
		<div>
			<div class={cn(enableColumnReordering || enableColumnVisiblitySelect ? 'pb-2' : '')}>
				<div class="flex  justify-between gap-2 sm:flex-row flex-wrap">
					<div>
						<slot name="actions" />
					</div>
					<div class="flex flex-row items-center gap-2 self-end flex-wrap ">
						{#if enableColumnReordering}
							<ColumnOrderDraggableChanger columns={columnsStore} />
						{/if}
						{#if enableColumnVisiblitySelect}
							<ColumnVisibilitySelect {columns} hidden={hiddenColumns} />
						{/if}
						{#if enableFullscreenMode}
							<FullscreenModeToggle {fullscreenMode} {target} />
						{/if}
					</div>
				</div>
				<div>
					<slot name="filters" />
				</div>
			</div>
			<div class={cn(' w-full border border-t-0', enablePagination && 'mb-2')}>
				<Table.Root
					class={cn(
						'h-[500px] w-full min-w-max',
						typeof classNames.table === 'function' ? classNames.table() : classNames.table
					)}
				>
					<Table.Header class="sticky top-0 bg-primary-foreground min-w-fit">
						<Table.Row
							class={cn('', typeof classNames.th === 'function' ? classNames.th() : classNames.th)}
						>
							{#each $columnsStore.filter((c) => !$hiddenColumns.includes(c.accessor)) as column, columnIndex}
								<Table.Head
									class={cn('group flex flex-row gap-1 last:grow', column.head?.class)}
									style="width: {$columnSizes.find((obj) => obj.accessor == column.accessor).w}px"
								>
									{#if typeof column?.head?.component === 'string' || typeof column.head?.component === 'number'}
										<span class="truncate text-nowrap">
											{column.head.component}
										</span>
									{:else if column.head?.component}
										<svelte:component
											this={column.head.component}
											props={{
												column
											}}
										/>
									{:else if column.header}
										<span class="truncate text-nowrap">
											{column.header}
										</span>
									{/if}
									<div class="flex w-fit flex-row gap-1">
											{#if column && column?.config?.sortable !== false && enableSorting}
											<SortingToggle {column} {sorting} />
											{/if}
											{#if column.config?.resizable != false && enableResizing}
												<div
													class="hidden h-full min-w-1 cursor-col-resize self-end justify-self-end bg-foreground group-hover:flex"
													use:resize={{ accessor: column.accessor }}
												/>
											{/if}
										</div>
								</Table.Head>
							{/each}
						</Table.Row>
					</Table.Header>
					{#if enableVirtualization}
						<div class="h-[500px] overflow-y-auto overflow-x-hidden" bind:this={virtualListEl}>
							<Table.Body style=" height: {$virtualizer.getTotalSize()}px" class={cn('relative')}>
								<div
									style="position: absolute; top: 0; left: 0; width: 100%; transform: translateY({items[0]
										? items[0].start
										: 0}px);"
								>
									{#each items as row, idx (row.index)}
										{@const dataRow = data[row.index]}
										{@const dataIndex = row.index}
										<div bind:this={virtualItemEls[idx]} data-index={row.index}>
											<Table.Row
												class={cn(
													'group',
													typeof classNames.row === 'function'
														? classNames.row({ row, rowIndex: dataIndex })
														: classNames.row
												)}
											>
												{#each $columnsStore.filter((c) => !$hiddenColumns.includes(c.accessor)) as column, columnIndex}
													<Table.Cell
														class={cn(
															'last:grow',
															typeof classNames.cell === 'function'
																? classNames.cell({ row, column, columnIndex })
																: classNames.cell,
															typeof column?.cell?.class === 'function'
																? column?.cell?.class({ row, column, columnIndex })
																: column?.cell?.class
														)}
														style="width: {$columnSizes.find(
															(obj) => obj.accessor == column.accessor
														).w}px"
													>
														{#if $inlineEditing.includes(dataRow.id)}
															<CellEditableTemplate row={dataRow} rowIndex={dataIndex} {column} />
														{:else}
															<CellTemplate row={dataRow} rowIndex={dataIndex} {column} />
														{/if}
													</Table.Cell>
												{/each}
											</Table.Row>
											{#if $expandedRows.includes(dataRow.id)}
												<Table.Row class="h-full w-full">
													<slot
														name="expandedRowContent"
														props={{
															row: dataRow,
															rowIndex: dataIndex
														}}
													/>
												</Table.Row>
											{/if}
										</div>
									{/each}
								</div>
							</Table.Body>
						</div>
					{:else if !enableVirtualization}
						<Table.Body class="flex flex-col">
							{#if !loading && data.length < 1}
								<Table.Row>
									<Table.Cell class="flex">
										<div class="flex flex-col items-center justify-center">
											<FolderX class="size-10 text-muted-foreground" strokeWidth={1} />
											<p class="text-md text-muted-foreground">No data found</p>
										</div>
									</Table.Cell>
								</Table.Row>
							{/if}

							{#each $visibleRows as row, rowIndex}
								<Table.Row
									class={cn(
										'group',
										typeof classNames.row === 'function'
											? classNames.row({ row, rowIndex })
											: classNames.row
									)}
								>
									{#each $columnsStore.filter((c) => !$hiddenColumns.includes(c.accessor)) as column, columnIndex}
										<Table.Cell
											class={cn(
												'',
												typeof classNames.cell === 'function'
													? classNames.cell({ row, column, columnIndex })
													: classNames.cell,
												typeof column?.cell?.class === 'function'
													? column?.cell?.class({ row, column, columnIndex })
													: column?.cell?.class
											)}
											style="width: {$columnSizes.find((obj) => obj.accessor == column.accessor)
												.w}px"
										>
											{#if $inlineEditing.includes(row.id)}
												<CellEditableTemplate {row} {rowIndex} {column} />
											{:else}
												<CellTemplate {row} {rowIndex} {column} />
											{/if}
										</Table.Cell>
									{/each}
								</Table.Row>
								{#if $expandedRows.includes(row.id)}
									<Table.Row class="h-full w-full">
										<slot
											name="expandedRowContent"
											props={{
												row,
												rowIndex
											}}
										/>
									</Table.Row>
								{/if}
							{/each}
						</Table.Body>
					{/if}
				</Table.Root>
			</div>
			{#if enablePagination}
				<Pagination bind:count bind:perPage bind:page />
			{/if}
		</div>
	</div>
</div>
