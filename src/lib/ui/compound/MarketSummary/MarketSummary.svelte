<script lang="ts">
	import type { StockData } from '../../../providers/providers/getStockData';
	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
	import MarketSummaryItem from './components/MarketSummaryItem/MarketSummaryItem.svelte';
	import Button from '$lib/ui/primitive/Button';
	import Text from '$lib/ui/primitive/Text/Text.svelte';

	export let stockData: StockData[];
	let chosenMarket:string = "US";

	
	console.log(stockData);
	const scrollStep: number = 200;
	let container: HTMLDivElement;

	function scrollLeft() {
		container.scroll({
			left: container.scrollLeft - scrollStep,
			behavior: 'smooth'
		});
	}
	function scrollRight() {
		container.scroll({
			left: container.scrollLeft + scrollStep,
			behavior: 'smooth'
		});
	}
</script>


<div class="market-summary__container">
	<div class="mark-x">
		<span class="market-selector_container">
			<Text size="sm" color="weak">
				MARKETS
			</Text>

			<span class="button-container">
				{#each Object.keys(stockData) as mkt}
				<Button size="sm" variant={chosenMarket == mkt ?  "ghost": "outline"}>
					{mkt}
				</Button>
				{/each}
			</span>
			
		</span>
		<div class="market-summary__inner-container">
			<div bind:this={container} class="market-summary__item-container">
				{#each stockData[chosenMarket] as sd}
					<MarketSummaryItem stockData={sd} />
				{/each}
			</div>
		</div>
</div>
	<div class="market-summary__nav-button-container">
		<Button shape="circle" variant="outline" on:click={scrollLeft}>
			<ArrowLeft />
		</Button>
		<Button shape="circle" variant="outline" on:click={scrollRight}>
			<ArrowRight />
		</Button>
	</div>
</div>

<style>
	.market-summary__container {
		display: flex;
		width: calc(100% - var(--space-md) - var(--space-md) - var(--space-md));
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: var(--space-md);
		scroll-behavior: smooth;
		max-width: var(--max-width);
		padding-inline: var(--space-md);
		padding-bottom: var(--space-sm);
	}
	.market-selector_container{
		display: flex;
		align-items: flex-start;
		width: 100%;
		flex-direction: column;
		justify-content: flex-start;
		gap: var(--space-xs);
	}
	.mark-x{
		display: flex;
		gap:var(--space-md);
		flex-direction: column;
		width: 100%;
	}
	.button-container{
		display: flex;
		align-items: flex-start;
		width: 100%;
		gap:var(--space-sm);
		flex-direction: row;
		justify-content: flex-start;
	}

	.market-summary__item-container {
		display: flex;
		width: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
		gap: var(--space-md);
	}
	.market-summary__inner-container{
		display: flex;
		width: 100%;
		overflow-x: hidden;
		gap: var(--space-md);
	}

	.market-summary__nav-button-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--space-md);
	}
	@media(max-width:500px){
		.market-summary__nav-button-container{
			flex-direction: column;
		}
		.market-summary__item-container{
			overflow-x: scroll;
		}
	}
</style>
