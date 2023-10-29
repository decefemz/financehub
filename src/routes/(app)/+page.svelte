<script lang="ts">
	import type { PageData } from './$types';
	import MarketSummary from '$lib/ui/compound/MarketSummary';
	import ArticleDisplay from '$lib/ui/compound/ArticleDisplay';
	import Button from '$lib/ui/primitive/Button';
	import Text from '$lib/ui/primitive/Text';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './news/$types';
	import Spinner from '$lib/ui/primitive/Spinner/Spinner.svelte';
	export let data: PageData;
	let form:HTMLFormElement;

	let otherNewsLoading:boolean = false;
	let otherNews:any[] = [];

	onMount(()=>{
		form.requestSubmit();
	})

	const onSubmit: SubmitFunction = () => {
		otherNewsLoading = true;
		return async (e) => {
			otherNewsLoading = false;
			const { update, result }: { update: typeof e.update; result: any } = e;
			otherNews = result.data.articles;
			await update({ reset: false });
		};
	};
	
	console.log(data);
</script>

<main>
	<section class="market-summary">
			<MarketSummary stockData={data.marketOverview} />
	</section>
	<div class="inner-container">
		<div class="articles-container">
			<section class="featured-articles-container">
				<ArticleDisplay
					variant="full"
					title={data.articles.featuredArticles[0].title}
					articleSource={{
						name: data.articles.featuredArticles[0].source.name,
						url: data.articles.featuredArticles[0].source.url
					}}
					image={{
						url: data.articles.featuredArticles[0].imageSrc,
						alt: `Header image for article titled: ${data.articles.featuredArticles[0].title}`
					}}
					url={data.articles.featuredArticles[0].url}
					description={data.articles.featuredArticles[0].content}
					class="featured-article"
				/>

				<div class="side-articles-container">
					{#each data.articles.featuredArticles as a,i}
						{#if i !== 0}
						<ArticleDisplay
							variant="tiled"
							title={a.title}
							articleSource={{
								name: a?.source?.name,
								url: a?.source?.url
							}}
							image={{
								url: a.imageSrc,
								alt: `Header image for article titled: ${a.title}`
							}}
							url={a.url}
							description={a.content}
							class="featured-article"
						/>
						{/if}
					{/each}
				</div>
			</section>

			<section class="other-articles-container">
				<Text size="xl" weight="medium">More financial news</Text>

				<form bind:this={form} use:enhance={onSubmit} action="/news" method="POST"  class="news-filter-container" >
					<Button size="md" on:click={() => console.log('clicked')} variant="outline">Top stories</Button>
					<Button size="md" variant="ghost">Local markets</Button>
					<Button size="md" variant="outline">World markets</Button>
				</form>
				
				{#if otherNewsLoading}
					<Spinner/>
				{:else}
					{#each otherNews as n}
						<ArticleDisplay
							variant="detailed"
							title={n.title}
							articleSource={{
								name: n?.source?.name,
								url: n?.source?.url
							}}
							image={{
								url: n.imageSrc,
								alt: `Header image for article titled: ${n.title}`
							}}
							url={n.url}
							description={n.content}
							class="featured-article"
						/>
					{/each}
				{/if}
				

				
			</section>
		</div>
		<div class="live-quotes __hidden-at-768px">live quotes section</div>
	</div>
</main>

<style>
	main {
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-width: 1200px;
		overflow-x: auto;
	}

	.market-summary {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.inner-container {
		display: flex;
		gap: var(--space-md);
		display: flex;
		flex-direction: row;
		flex: 1;
		max-width: var(--max-width);
		padding-top: var(--space-md);
		width: 100%;
	}

	.articles-container {
		flex: 4;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		width: 100%;
	}

	.live-quotes {
		flex: 1;
		min-width: 300px;
		background: white;
		border-radius: var(--border-radius-md);
		border: 1px solid var(--primary-border-color);
		padding: var(--space-md);
	}

	.featured-articles-container {
		flex: 3;
		gap: var(--space-md);
		padding: var(--space-md);
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		justify-content: center;
	}

	.side-articles-container {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 100%;
		gap: var(--space-md);
	}
	:global(.featured-article) {
		flex: 2;
		height: 100%;
	}

	.other-articles-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-md);
	}

	.news-filter-container {
		display: flex;
		flex-direction: row;
		gap: var(--space-sm);
	}

	@media (max-width: 768px) {
		main {
			min-width: 300px;
		}
		.featured-articles-container {
			flex-direction: column;
			gap: var(--space-md);
		}
		.side-articles-container {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-md);
		}
		.live-quotes {
			display: none;
		}
	}

	@media (max-width: 500px) {
		main {
			min-width: 300px;
			padding-inline: 0;
		}
		.side-articles-container {
			display: flex;
			flex-direction: row;
			overflow-y: scroll;
			gap: var(--space-sm);
		}
		
		.other-articles-container {
			padding-top: 0;
		}
	}
	@media (min-width: 500px) {
	}
</style>
