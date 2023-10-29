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
		<Button class="hamburger" shape="circle" variant="default" size="lg">
			<MenuIcon />
		</Button>
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
			</div>
		</div>
	</div>
	<div class="searchbar-container--mobile">
		<Searchbar action="/search" size="lg" placeholder="Search for news, companies, or symbols." />
	</div>
</header>


<style>
	header {
		--header--bg-color: white;
		position: fixed;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		background-color: var(--header--bg-color);
		padding: 0 var(--space-lg) var(--space-sm);
		top: 0;
		z-index: 10;
		border-bottom: 1px solid var(--primary-border-color);
	}
	.inner-container {
		padding: var(--space-sm) var(--space-xs);
		padding-bottom: 0;
		display: flex;
		gap: var(--space-sm);
		align-items: center;
		justify-content: center;
	}

	.searchbar-container {
		width: 100%;
		height:fit-content;
		align-items: center;
		display: flex;
		justify-content: center;
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
		height:100%;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-end;
	}

	.button-container {
		display: flex;
		height:100%;
		min-width: max-content;
		align-items: center;
		justify-content: flex-end;
	}

	:global(.icon-logo) {
		display: none !important;
	}
	@media (max-width: 768px) {
		:global(.signin) {
			display: none !important;
		}
		header {
			border-bottom: 1px solid var(--primary-border-color);
			padding: 0 var(--space-md) var(--space-xs);
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
			padding-right: 33px;
		}
	}
</style>
