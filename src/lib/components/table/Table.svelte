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

	export let loading = true;
	export let data: any[] = [];
	$: console.log('data', data);

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
	$: visibleRows.set(data);

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

	let target = writable('#tableContent');
</script>



<!-- portal set to tableContent cause expanded rows to render below table - idk why  -->
<!-- there is no way to use action conditionally so disabling portal conditionally is not possible -->
<!-- expanded rows functionality is more important to me than fullscreen mode -->
<!-- you can choose one or another -->

<!-- <div id="tableContent">
	<div
		class={cn(
			'z-10 flex flex-col bg-background',
			$fullscreenMode ? 'absolute h-screen w-screen p-2' : 'flex h-full w-full flex-col'
		)}
		use:portalAction={$target}
	> -->

<div>
	<div class={cn(enableColumnReordering || enableColumnVisiblitySelect ? 'pb-2' : '')}>
		<div class="flex flex-col justify-between gap-2 sm:flex-row">
			<div>
				<slot name="actions" />
			</div>
			<div class="flex flex-row items-center gap-2 self-end">
				{#if enableColumnReordering}
					<ColumnOrderDraggableChanger columns={columnsStore} />
				{/if}
				{#if enableColumnVisiblitySelect}
					<ColumnVisibilitySelect {columns} hidden={hiddenColumns} />
				{/if}
				{#if enableFullscreenMode}
					<FullscreenModeToggle {fullscreenMode} {target} />
				{/if}
				<!-- <Button size="icon" variant="default"><Settings /></Button> -->
			</div>
		</div>
		<div>
			<slot name="filters" />
		</div>
	</div>
	<div class={cn('h-full w-full', enablePagination && 'pb-2')}>
		<div class="overflow-auto border-[1px] border-solid">
			<!-- TABLE -->
			<div
				class={cn(
					'h-[466px] min-w-max rounded-md  ',
					typeof classNames.table === 'function' ? classNames.table() : classNames.table
				)}
			>
				<!-- THEAD -->
				<div>
					<!-- TR -->
					<div
						class={cn(
							'flex flex-row gap-2 overflow-hidden border-b-[1px] hover:bg-accent/50',
							typeof classNames.th === 'function' ? classNames.th() : classNames.th
						)}
					>
						{#each $columnsStore.filter((c) => !$hiddenColumns.includes(c.accessor)) as column, columnIndex}
							<!-- TH -->
							<div
								class="text-md group flex font-semibold first:pl-2 last:grow last:pr-2"
								style="width: {$columnSizes.find((obj) => obj.accessor == column.accessor).w}px"
								class:justify-start={column?.config?.align == 'left'}
								class:justify-center={column?.config?.align == 'center'}
								class:justify-end={column?.config?.align == 'right'}
							>
								<div class="flex items-center gap-2 overflow-clip truncate py-2">
									{#if column.headerCell}
										<svelte:component
											this={column.headerCell}
											props={{
												column
											}}
										/>
									{:else}
										<span class=" truncate text-nowrap">
											{column.header}
										</span>
									{/if}
									{#if column && column?.config?.sortable !== false && enableSorting}
										<SortingToggle {column} {sorting} />
									{/if}
								</div>
								{#if column.config?.resizable != false && enableResizing}
									<div
										class="ml-auto hidden h-full w-1 cursor-col-resize bg-foreground group-hover:flex"
										use:resize={{ accessor: column.accessor }}
									/>
								{/if}
							</div>
						{/each}
					</div>
				</div>
				<!-- TBODY -->

				{#if enableVirtualization}
					<div class="shadow-xs h-[400px] overflow-auto" bind:this={virtualListEl}>
						<div style="position: relative; height: {$virtualizer.getTotalSize()}px; width: 100%;">
							<div
								style="position: absolute; top: 0; left: 0; width: 100%; transform: translateY({items[0]
									? items[0].start
									: 0}px);"
							>
								{#each items as row, idx (row.index)}
									{@const dataRow = data[row.index]}
									{@const dataIndex = row.index}
									<!-- row -->
									<div
										bind:this={virtualItemEls[idx]}
										data-index={row.index}
										class="flex-col items-center justify-center border-b-[1px] last:border-b-0"
									>
										<div
											class={cn(
												'group flex h-10 flex-row items-center gap-x-2 border-b-[1px] border-border last:border-b-0 hover:bg-accent/50',
												typeof classNames.row === 'function' ? classNames.row(row) : classNames.row
											)}
										>
											{#each $columnsStore.filter((c) => !$hiddenColumns.includes(c.accessor)) as column}
												<!-- TD -->
												<div
													class={cn(
														' truncate text-nowrap first:pl-2 last:grow last:pr-2',
														typeof classNames.cell === 'function'
															? classNames.cell(row, column)
															: classNames.cell
													)}
													style="width: {$columnSizes.find((obj) => obj.accessor == column.accessor)
														.w}px"
													class:text-start={column?.config?.align == 'left'}
													class:text-center={column?.config?.align == 'center'}
													class:text-end={column?.config?.align == 'right'}
												>
													{#if $inlineEditing.includes(dataRow.id)}
														<CellEditableTemplate row={dataRow} rowIndex={dataIndex} {column} />
													{:else}
														<CellTemplate row={dataRow} rowIndex={dataIndex} {column} />
													{/if}
												</div>
											{/each}
										</div>
										{#if $expandedRows.includes(dataRow.id)}
											<div class=" bg-expandedTableContent h-full w-full">
												<slot
													name="expandedRowContent"
													props={{
														row: dataRow,
														rowIndex: dataIndex
													}}
												/>
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					</div>
				{:else if !enableVirtualization}
					<div class="flex flex-col">
						{#if !loading && data.length < 1}
							<!-- TR -->
							<div>
								<!-- TD -->
								<div class="flex">
									<div class="flex flex-col items-center justify-center">
										<FolderX class="size-10 text-muted-foreground" strokeWidth={1} />
										<p class="text-md text-muted-foreground">No data found</p>
									</div>
								</div>
							</div>
						{/if}
						{#each data as row, rowIndex}
							<!-- TR -->
							<div
								class={cn(
									'group flex h-10 flex-row items-center gap-x-2 border-b-[1px] border-border last:border-b-0 hover:bg-accent/50',
									typeof classNames.row === 'function' ? classNames.row(row) : classNames.row
								)}
							>
								{#each $columnsStore.filter((c) => !$hiddenColumns.includes(c.accessor)) as column}
									<!-- TD -->
									<div
										class={cn(
											' truncate text-nowrap first:pl-2 last:grow last:pr-2',
											typeof classNames.cell === 'function'
												? classNames.cell(row, column)
												: classNames.cell
										)}
										style="width: {$columnSizes.find((obj) => obj.accessor == column.accessor).w}px"
										class:text-start={column?.config?.align == 'left'}
										class:text-center={column?.config?.align == 'center'}
										class:text-end={column?.config?.align == 'right'}
									>
										{#if $inlineEditing.includes(row.id)}
											<CellEditableTemplate {row} {rowIndex} {column} />
										{:else}
											<CellTemplate {row} {rowIndex} {column} />
										{/if}
									</div>
								{/each}

								<!-- class:bg-red-400={row.id == 4} -->
							</div>
							{#if $expandedRows.includes(row.id)}
								<div class=" bg-expandedTableContent h-full w-full">
									<slot
										name="expandedRowContent"
										props={{
											row,
											rowIndex
										}}
									/>
								</div>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
	{#if enablePagination}
		<Pagination bind:count bind:perPage bind:page />
	{/if}
</div>

<!-- </div>
</div> -->
