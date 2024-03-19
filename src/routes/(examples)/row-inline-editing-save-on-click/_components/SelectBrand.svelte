<!-- ['MARGIN', "MARKUP", "AMOUNT_MARKUP", "FIXED_NET_PRICE"]) -->

<script lang="ts">
	import type { CellProps } from '$lib/components/table';
	import * as Select from '$lib/components/ui/select';

	export let props: CellProps;

	let options = [
		{
			value: 'Samsung',
			label: 'Samsung'
		},
		{
			value: 'Motorola',
			label: 'Motorola'
		},
		{
			value: 'Apple',
			label: 'Apple'
		}
	];

	$: selected = props.value
		? {
				label: options.find((e) => e.value == props.value)?.label,
				value: options.find((e) => e.value == props.value)?.value
			}
		: undefined;

	let rows = props.column.extra.rows;
</script>

<Select.Root
	{selected}
	onSelectedChange={async (v) => {
		let newRows = $rows.map((row) => {
			if (row.id === props.row.id) {
				return { ...row, brand: v?.value };
			}
			return row;
		});
		$rows = newRows;
	}}
>
	<Select.Trigger class="w-full">
		<Select.Value placeholder="I was too lazy to add every brand, sorry ;)" />
	</Select.Trigger>
	<Select.Content>
		{#each options as option}
			<Select.Item value={option.value}>{option.label}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
