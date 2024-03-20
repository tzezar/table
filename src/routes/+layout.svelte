<script lang="ts">
	import '../app.pcss';
	import { Moon, Sun, Menu } from 'lucide-svelte';
	import Sidebar from './_components/Sidebar.svelte';

	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';

	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Toaster } from '$lib/components/ui/sonner';

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	let openStore = setContext('sidebar', writable(false));

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	import logoBlack from '$lib/assets/tzezar-logo-black.png';
	import logoWhite from '$lib/assets/tzezar-logo-white.png';
</script>

<QueryClientProvider client={queryClient}>
	<Toaster />
	<ModeWatcher />
	<div class="fixed h-full w-full">
		<div
			class="header flex max-h-[64px] flex-row items-center gap-2 border-b-[1px] border-b-secondary p-2"
		>
			<div class="flex w-full flex-row items-center justify-between">
				<a href="/" class="flex flex-row items-center justify-center align-middle">
					{#if $mode == 'dark'}
						<img src={logoWhite} alt="" srcset="" class="h-[64px]" />
					{:else}
						<img src={logoBlack} alt="" srcset="" class="h-[64px]" />
						<!-- else content here -->
					{/if}
					<h1 class="text-4xl font-bold">TZEZAR's TABLE</h1>
				</a>

				<div class="flex flex-row gap-2">
					<Button on:click={toggleMode} class="">
						<div class="relative h-10 w-6">
							<Sun
								class=" absolute left-0 top-[20%] rotate-0 scale-100 transition-all  dark:scale-0"
							/>
							<Moon
								class="absolute left-0 top-[20%] scale-0 transition-all dark:rotate-0 dark:scale-100"
							/>
						</div>
					</Button>
					<div class="flex items-center sm:hidden">
						<Sheet.Root bind:open={$openStore}>
							<Sheet.Trigger><Menu size={32} /></Sheet.Trigger>
							<Sheet.Content side="right" class="p-2">
								<Sheet.Header>
									<Sheet.Title>Menu</Sheet.Title>
									<Sheet.Description></Sheet.Description>
								</Sheet.Header>
								<div class="pt-2">
									<Sidebar />
								</div>
							</Sheet.Content>
						</Sheet.Root>
					</div>
				</div>
			</div>
		</div>
		<div class="content flex min-h-screen flex-row">
			<div
				class="hidden h-full w-52 min-w-52 overflow-auto border-r-[1px] border-r-secondary p-2 sm:block"
			>
				<Sidebar />
			</div>
			<div class="flex h-full min-h-full w-full flex-col justify-between overflow-auto p-2">
				<div>
					<slot />
				</div>
				<div class="flex w-full flex-col gap-2 self-center font-medium">
					<Separator />
					<div class="flex flex-row gap-2 self-center">
						<a href="https://discord.gg/QySYfxSTvJ">DISCORD</a> |
						<a href="https://github.com/tzezar/table">GITHUB</a>
					</div>
					<p class="self-center">
						Sebastian "Tzezar" Drozd {new Date().getFullYear()}
					</p>
				</div>
			</div>
		</div>
	</div>
	<SvelteQueryDevtools initialIsOpen={true} />
</QueryClientProvider>

<style>
	:root {
		--header-height: 64px;
	}

	.header {
		height: var(--header-height);
	}

	.content {
		min-height: calc(100% - var(--header-height));
		height: calc(100% - var(--header-height));
	}
</style>
