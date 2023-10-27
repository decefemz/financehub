<script lang="ts">
	import Logo from '$lib/ui/primitive/Logo/Logo.svelte';
	import Searchbar from '$lib/ui/compound/Searchbar';
	import Button from '$lib/ui/primitive/Button';
	import MenuIcon from 'svelte-material-icons/Menu.svelte';
	import { navPages } from './config';

	let activePage: string = 'home';
</script>

<header>
	<div class="inner-container">
		<div class="logo-container">
			<Logo variant="full" />
			<Logo variant="icon" />
		</div>
		<div class="searchbar-container">
			<Searchbar action="/search" size="lg" placeholder="Search for news, companies, or symbols." />
		</div>
		<div class="account-actions">
			<div class="button-container">
				<Button class="signin" to="/account/login" variant="default">Log In</Button>
				<Button class="signin" to="/account/signup">Sign Up</Button>

				<Button class="hamburger" shape="circle" variant="default" size="lg">
					<MenuIcon />
				</Button>
			</div>
		</div>
	</div>
	<div class="searchbar-container--mobile">
		<Searchbar action="/search" size="lg" placeholder="Search for news, companies, or symbols." />
	</div>
</header>
<nav>
	{#each navPages as page}
		<a class:active={page.slug === activePage} href={page.url}>
			{page.title}
		</a>
	{/each}
</nav>

<style>
	header {
		--header--bg-color: white;
		--header--height: 60px;
		position: sticky;
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: var(--header--bg-color);
		padding: 0 var(--space-lg) var(--space-xs);
		top: 0;
		height: var(--header--height);
		z-index: 10;
	}
	.inner-container {
		padding: var(--space-sm) var(--space-xs) 0;
		padding-bottom: 0;
		display: flex;
		gap: var(--space-md);
		align-items: center;
		justify-content: center;
	}

	.searchbar-container {
		width: 100%;
	}

	.searchbar-container--mobile {
		display: none;
		padding-top: var(--space-xs);
	}

	.logo-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.account-actions {
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-end;
	}

	.button-container {
		display: flex;
		min-width: max-content;
		align-items: center;
		justify-content: flex-end;
	}

	nav {
		background-color: var(--header--bg-color);
		gap: var(--space-sm);
		display: flex;
		align-items: flex-end;
		flex-direction: row;
		flex: 1;
		position: sticky;
		top: 1px;
		height: 64px;
		z-index: 9;
		justify-content: center;
		padding: var(--space-sm);
		padding-top: var(--space-md);
		padding-bottom: var(--space-md);
		border-bottom: 1px solid var(--primary-border-color);
		width: 100%;
	}
	nav a {
		padding: var(--space-xs) var(--space-md);
		text-decoration: none;
		border-radius: var(--border-radius-md);
		font-size: var(--font-size-md);
		color: var(--color-text);
		font-weight: 500;
	}
	nav a:global(.active) {
		border: 1px solid var(--indigo-400);
		color: var(--indigo-400);
	}
	:global(.hamburger),
	:global(.icon-logo) {
		display: none !important;
	}
	@media (max-width: 768px) {
		nav,
		:global(.signin) {
			display: none !important;
		}
		header {
			border-bottom: 1px solid var(--primary-border-color);
			padding: 0 var(--space-md) var(--space-xs);
		}
		:global(.hamburger) {
			display: initial !important;
		}
		:global(.icon-logo) {
			display: initial !important;
		}
		:global(.full-logo) {
			display: none !important;
		}
	}
	@media (max-width: 500px) {
		.searchbar-container,
		:global(.icon-logo) {
			display: none !important;
		}
		header {
			height: fit-content;
		}
		:global(.full-logo),
		.searchbar-container--mobile {
			display: initial !important;
		}
		.logo-container {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			padding-left: 33px;
		}
	}
</style>
