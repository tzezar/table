<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { createQuery } from '@tanstack/svelte-query';


    // You can supply the data in any way you like, I will use tanstack-query here. 
    // You can fetch them in load() on the server to have an SSR. 
    // You can even feed them from an array.
    // It's up to you.
	$: query = createQuery({
		queryKey: ['products'],
		queryFn: async () => {
			return await fetch('https://dummyjson.com/products').then((res) => res.json());
		}
	});

   // We define the columns in this way, you have probably seen this scheme in other libraries. 
   // Accessor can be nested like "category.name" etc. Header, I don't need to explain - just the header.
	let columns: Columns = [
		{ accessor: 'id', header: 'Id' },
		{ accessor: 'title', header: 'Title' },
		{ accessor: 'description', header: 'Description' },
		{ accessor: 'brand', header: 'Brand' },
		{ accessor: 'rating', header: 'Rating' }
	];
</script>

<!-- We must specify columns and data -->
<Table {columns} data={$query?.data?.products} />


