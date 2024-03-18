<script lang="ts">
	import type { CellProps } from '..';

	export let props: CellProps;
</script>

<a href={`${props.column.extra.link}${props.row.id}`}>{props.value}</a>
