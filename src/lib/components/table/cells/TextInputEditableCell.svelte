<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	export let props;
</script>

<Input
	name={props.column.accessor}
	type="text"
	rozmiar="tableCell"
	value={props.value}
	class="rounded-none border-y-0 bg-none pr-0"
	on:change={(e) =>
		props.column.extra.onChange({
			value: e.target.value,
			id: props.row.id,
			accessor: props.column.accessor
		})}
/>
