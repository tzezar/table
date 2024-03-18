<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';

	export let columns;

	import { flip } from 'svelte/animate';
	import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from 'svelte-dnd-action';
	import { cubicIn } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { GripHorizontal } from 'lucide-svelte';

	const flipDurationMs = 50;
	function handleDndConsider(e) {
		$columns = e.detail.items;
	}
	function handleDndFinalize(e) {
		$columns = e.detail.items;
	}
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Order</Button>
	</Popover.Trigger>
	<Popover.Content>
		<div class="">
			<section
				class="flex flex-col gap-2"
				use:dndzone={{
					items: $columns,
					flipDurationMs,
					dropTargetStyle: { outline: 'none' }
				}}
				on:consider={handleDndConsider}
				on:finalize={handleDndFinalize}
			>
				{#each $columns as item (item.id)}
					<!-- class:hidden={item.config.hideable == false} -->
					<div
						animate:flip={{ duration: flipDurationMs }}
						class="item text-md flex flex-row items-center justify-between rounded-sm border-[1px] border-solid border-border px-2 py-1 font-medium"
					>
						<!-- {#if item.config.moveable != false} -->
						{item.header}
						<GripHorizontal size={18} />
						{#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
							<div in:fade={{ duration: 200, easing: cubicIn }}>
								{item.header}
							</div>
						{/if}
						<!-- {/if} -->
					</div>
				{/each}
				<p class="text-center text-sm text-foreground/70">
					To change column order, click and hold one. Then move to the desired location and release.
				</p>
			</section>
		</div>
	</Popover.Content>
</Popover.Root>
