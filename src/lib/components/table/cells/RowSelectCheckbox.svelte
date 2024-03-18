<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { getContext } from 'svelte';

	export let props;
	$: rowId = props.row.id;

	const { selectedRows } = getContext('table');
	$: checked = $selectedRows.includes(rowId);

	const selectRow = ({ rowId }: { rowId: number }) => {
		if (checked) {
			selectedRows.deselect(rowId);
		} else {
			selectedRows.select(rowId);
		}
	};
</script>
<div class='align-middle justify-center flex items-center h-full w-full'>

	<Checkbox bind:checked on:click={(e) => selectRow({ rowId })} class=''/>
</div>
