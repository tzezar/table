<script lang="ts">
	import ss from '$lib/assets/ss.jpg';
</script>

<article class="prose text-foreground">
	<h1 class='text-foreground'>What's planned?</h1>

	<h3 class='text-foreground'>Virtualisation</h3>
	<p >
		Virtualisation is not easy especially with something as complex as tables. In a private project
		I use it with the table component in several places, but I am aware of one bug and until I fix
		it it will not be implemented. I need to spend some time on this and it will certainly be added.
	</p>
	<h3 class='text-foreground'>Client-side functionalities</h3>
	<p>
		I actually have this already implemented in a private project too, but it's not pretty code and
		needs to be rewritten before it sees the light of day.
	</p>
	<h3 class='text-foreground'>More examples</h3>
	<p>
		There are things such as filter slots or additional actions or global search that are not
		described. More examples will be added when I have time. Unfortunately I have a lot of other
		work right now.
	</p>
	<h3 class='text-foreground'>Advanced filter functionality</h3>
	<p>
		I don't quite know if this fits in well with the theme of the table, on the one hand it is
		geared towards server data, but on the other hand such a component is something else entirely.
		Maybe it will be as an additional component.
	</p>
	<img src={ss} alt="" srcset="" class="w-full max-w-[720px]" />

	<h3 class='text-foreground'>Async loading indicator</h3>
	<p>
		In theory this is implemented and you can pass `loading` to a component, but the loading
		indicator is a simple loader, not some beauty. Definitely to be improved as I find time.
	</p>

	<h3 class='text-foreground'>Column filtering</h3>
	<p>
		I'm not a big fan of this solution but I know some people will need it. To be done in the
		future.
	</p>
	<h3 class='text-foreground'>Density toggle</h3>
	<p>This is actually implemented in my private project, I will soon add it for sure.</p>
	<h3 class='text-foreground'>Fullscreen</h3>
	<p>As above</p>
</article>
