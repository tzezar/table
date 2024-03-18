<script lang="ts">
	import { writable } from 'svelte/store';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown } from 'lucide-svelte';
	import type { Columns } from '$lib/components/table/index';
	import type { HiddenColumns } from '../stores/hiddenColumnsStore';

	export let columns: Columns;
	export let hidden: HiddenColumns;
</script>

<DropdownMenu.Root closeOnItemClick={false}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" class="ml-auto" builders={[builder]}>
			Visibility <ChevronDown class="ml-2 h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#each columns
			.filter((c) => c.header != '')
			.map( (c) => ({ accessor: c.accessor, header: c.header, disabled: c.config?.disableHiding }) ) as col}
			<DropdownMenu.CheckboxItem
				disabled={col.disabled || false}
				checked={!$hidden.includes(col.accessor)}
				onCheckedChange={(checked) => {
					if (checked == false) {
						let newHidden = [...$hidden, col.accessor];
						hidden.set(newHidden);
					} else if (checked == true) {
						let newHidden = $hidden.filter((h) => h !== col.accessor);
						hidden.set(newHidden);
					}
				}}
			>
				<!-- bind:checked={hideForId[col.id]} -->
				{col.header}
			</DropdownMenu.CheckboxItem>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
