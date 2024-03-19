<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import type { CellProps } from '..';
	export let props: CellProps;
</script>

<Input
	name={props.column.accessor}
	type="number"
	value={props.value}
	class="text-md rounded-none border-y-0 bg-none h-full"
	on:change={async (e) => {
		props.column.extra.onChange({
			value: +e.target.value,
			id: props.row.id,
			accessor: props.column.accessor
		});
	}}
/>
