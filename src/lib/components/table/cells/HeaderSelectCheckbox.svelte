<script lang="ts">
	import { getContext } from 'svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreHorizontal } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import type { VisibleRows } from '../stores/visibleRowsStore.js';
	import type { SelectedRows } from '../stores/selectedRowsStore.js';
	import type { HeaderCellProps } from '../index.js';

	export let props: HeaderCellProps;
	props;

	const { selectedRows, visibleRows }: { selectedRows: SelectedRows; visibleRows: VisibleRows } =
		getContext('table');
</script>

<div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="outline" size="icon" class="size-5 align-middle">
				<MoreHorizontal />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>Rows</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item on:click={() => selectedRows.selectAllOnPage($visibleRows)}
					>Select all on page</DropdownMenu.Item
				>
				<DropdownMenu.Item on:click={() => selectedRows.deselectAllOnPage($visibleRows)}
					>Unselect all on page</DropdownMenu.Item
				>
				<DropdownMenu.Item on:click={() => selectedRows.deselectAll()}
					>Unselect all</DropdownMenu.Item
				>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
