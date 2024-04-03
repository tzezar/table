<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Maximize, Minimize } from 'lucide-svelte';
	import type { FullscreenMode } from '../stores/fullscreenModeStore.js';
	import type { Writable } from 'svelte/store';

	export let fullscreenMode: FullscreenMode;
	export let target: Writable<string>;
</script>

<Button
	class="grow"
	variant="outline"
	on:click={() => {
		fullscreenMode.toggle();
		if ($target == 'body') {
			$target = '#tableContent';
		} else {
			$target = 'body';
		}
	}}
>
	{#if $fullscreenMode}
		<Minimize />
	{:else}
		<Maximize />
	{/if}
</Button>
