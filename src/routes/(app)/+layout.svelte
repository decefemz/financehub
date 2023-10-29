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
		padding-top:60px;
		background: linear-gradient(var(--grey-100),#fff,#fff);
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	@media(max-width:500px){
	.cont {
		padding-top:100px;
	}}
</style>
