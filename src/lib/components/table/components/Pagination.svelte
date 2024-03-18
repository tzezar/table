<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import * as Pagination from '$lib/components/ui/pagination';

	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	import { mediaQuery } from 'svelte-legos';

	const isDesktop = mediaQuery('(min-width: 768px)');
	$: siblingCount = $isDesktop ? 1 : 0;

	let limits = [
		{ value: 1, label: '1 row per page' },
		{ value: 2, label: '2 rows per page' },
		{ value: 3, label: '3 rows per page' },
		{ value: 10, label: '10 rows per page' }
	];

	export let count: number;
	export let perPage: number;
	export let page: number;
</script>

<div class="flex flex-wrap justify-start gap-2">
	<div>
		<Pagination.Root {count} {perPage} {siblingCount} let:pages let:currentPage bind:page>
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.PrevButton>
						<ChevronLeft class="h-4 w-4" />
						<span class="hidden sm:block">Previous</span>
					</Pagination.PrevButton>
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item>
							<Pagination.Link {page} isActive={currentPage == page.value}>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.NextButton>
						<span class="hidden sm:block">Next</span>
						<ChevronRight class="h-4 w-4" />
					</Pagination.NextButton>
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	</div>

	<div>
		<Select.Root
			portal={null}
			onSelectedChange={(v) => {
				if (!v) {
					throw new Error();
				}
				perPage = v?.value;
				if (page * perPage - perPage >= count) {
					page = Math.ceil(count / perPage);
				}
			}}
			selected={limits.find((p) => p.value == perPage)}
		>
			<Select.Trigger class="w-[180px]">
				<Select.Value />
			</Select.Trigger>
			<Select.Content align="start">
				{#each limits as limit}
					<Select.Item value={limit.value} label={limit.label}>{limit.label}</Select.Item>
				{/each}
			</Select.Content>
			<Select.Input name="favoriteFruit" />
		</Select.Root>
	</div>
</div>
