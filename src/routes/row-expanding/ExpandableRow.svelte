<script lang="ts">
	import type { CellProps } from '$lib/components/table/index.js';

	export let props: CellProps;
</script>

<pre class='w-[500px] overflow-hidden'>
    {JSON.stringify(props,"",2)}
</pre>
