<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { writable } from 'svelte/store';

	let open = writable(false);

</script>

<!-- 
onOpenChange={(v) => {
    if (v) {
        $query.refetch();
    }
}} -->
<Sheet.Root bind:open={$open}>
	<Sheet.Trigger asChild let:builder>
		<Button class='w-14 h-6' builders={[builder]}>EDIT</Button>
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Edit profile</Sheet.Title>
			<Sheet.Description>
				Make changes to your profile here. Click save when you're done.
			</Sheet.Description>
		</Sheet.Header>
		<!-- {#if $open && $query?.data?.product}
			<EditModalForm {id} product={$query?.data?.product} />
		{/if} -->
	</Sheet.Content>
</Sheet.Root>
