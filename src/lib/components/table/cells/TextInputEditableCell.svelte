<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	export let props;
</script>

<Input
	name={props.column.accessor}
	type="text"
	value={props.value}
	class="rounded-none  bg-none px-0 h-full py-0 "
	on:change={(e) =>
		props.column.extra.onChange({
			value: e.target.value,
			id: props.row.id,
			accessor: props.column.accessor
		})}
/>
