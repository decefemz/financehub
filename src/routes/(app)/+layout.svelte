<script lang="ts">
	import Header from '$lib/ui/layout/Header';
</script>

<div class="cont">
	<Header />
	<slot />
</div>

<style>
	.cont {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
</style>
