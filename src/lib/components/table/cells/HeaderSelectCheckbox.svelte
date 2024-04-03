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



<DropdownMenu.Root>
	<DropdownMenu.Trigger
		asChild
		let:builder
		class="flex w-full items-center justify-center align-middle self-center "
	>
		<Button variant="outline" class="m-0 h-fit p-0" builders={[builder]}>
			<MoreHorizontal size={20}/>
		</Button>

		<!-- <Button builders={[builder]} size='xs' variant='' class='leading-none justify-center align-middle flex'> -->
		<!-- </Button> -->
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="start">
		<DropdownMenu.Group>
			<DropdownMenu.Label>Rows</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item on:click={() => selectedRows.selectAllOnPage($visibleRows)}
				>Select all on page</DropdownMenu.Item
			>
			<DropdownMenu.Item on:click={() => selectedRows.deselectAllOnPage($visibleRows)}
				>Deselect all on page</DropdownMenu.Item
			>
			<DropdownMenu.Item on:click={() => selectedRows.deselectAll()}
				>Deselec all</DropdownMenu.Item
			>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
