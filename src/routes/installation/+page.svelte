<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Installation</h1>

<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight">shadcn-svelte</h4>
<p>
	I assume you already have shadcn-svelte installed, if not here is a tutorial: <a
		class="font-medium italic"
		href="https://www.shadcn-svelte.com/docs/installation"
		>https://www.shadcn-svelte.com/docs/installation</a
	>
</p>

<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight">Component</h4>
<p>
	Copy content of
	<a
		class="font-medium italic"
		href="https://github.com/530RGE/table/tree/main/src/lib/components/table"
		>https://github.com/530RGE/table/tree/main/src/lib/components/table</a
	>
	into your project.
</p>
<p>
	You also need <span class="font-medium">cn</span> helper function from
	<a class="font-medium italic" href="https://github.com/530RGE/table/blob/main/src/lib/utils.ts"
		>https://github.com/530RGE/table/blob/main/src/lib/utils.ts</a
	>.
</p>
<p>
	<span class="font-medium">flyAndScale</span> util is used for draggable column reordering (optional
	if you make custom component)
</p>

<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight">
	Table out of the box use those shadcn-svelte components
</h4>
<code>
	<pre>
        npx shadcn-svelte@latest add button
        npx shadcn-svelte@latest add select
        npx shadcn-svelte@latest add checkbox
        npx shadcn-svelte@latest add pagination
        npx shadcn-svelte@latest add dropdown-menu
        npx shadcn-svelte@latest add popover
        npx shadcn-svelte@latest add sheet
        npx shadcn-svelte@latest add input
    </pre>
</code>

<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight">
	Draggable column reordering uses svelte-dnd-action
</h4>
<code>
	<pre>
        npm i svelte-dnd-action
        npm i svelte-legos
    </pre>
</code>

<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight">Optional</h4>
<code>
	<pre>
        npm install mode-watcher
        npm i @tanstack/svelte-query
        npm i @tanstack/svelte-query-devtools
    </pre>
</code>

<p class="pb-6 leading-7">
	mode-watches is easy way to implement dark mode, and tanstack-query is good for data fetching
</p>

<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight">04/04/2024 update</h4>
<p class="pb-6 leading-7">
	I rebuilt the shadcn table to use divs (easier styling, ability to change width, no weird
	behaviour) and used them in the component. It made component cleaner and easier to read. You don't
	have to overwrite it, you can have both the
	official shadcn version and the one for the component built with divs.

	<a href="https://github.com/tzezar/table/tree/main/src/lib/components/table/table">
		<Button variant="link">just take a look at repo folder</Button>
	</a>
</p>

<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight">Code from examples</h4>
<p class="pb-6 leading-7">
	The code from the example as well as the annotations are available at <a
		class="font-medium"
		href="https://github.com/530RGE/table/tree/main/src/routes/(examples)">GITHUB</a
	>
</p>
