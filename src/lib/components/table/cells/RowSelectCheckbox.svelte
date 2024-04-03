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

<div class="pt-1">
	<Checkbox bind:checked on:click={(e) => selectRow({ rowId })} class="" />
</div>
