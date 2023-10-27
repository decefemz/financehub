<script lang="ts">
	import '$lib/styles/normalize.css';
	import '$lib/styles/tokens.css';
	import '$lib/styles/vars.css';
	import '@fontsource/inter';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
</script>

<slot />

<style>
	:global(html, body) {
		font-size: 16px;
		font-family: Inter;
		padding: 0;
		margin: 0;
	}
	:global(*) {
		box-sizing: border-box;
		font-family: Inter;
	}
</style>
