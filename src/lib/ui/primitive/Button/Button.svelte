<script lang="ts">
	import Spinner from '../Spinner/Spinner.svelte';

	type ButtonProps = {
		variant: 'primary' | 'outline' | 'default' | 'ghost';
		size: 'md' | 'lg';
		loading?: boolean;
		to?: string;
	};

	export let variant: ButtonProps['variant'] = 'primary';
	export let size: ButtonProps['size'] = 'md';
	export let to: ButtonProps['to'] = undefined;
	export let loading: ButtonProps['loading'] = false;
</script>

<svelte:element
	this={to ? 'a' : 'button'}
	on:click
	href={to}
	disabled={loading || $$restProps.disabled}
	class="
        button
        button--variant-{variant}
        button--size-{size} 
        {$$restProps.class}
    "
>
	{#if loading}
		<Spinner />
	{:else}
		<slot />
	{/if}
</svelte:element>

<style>
	.button {
		--button--size-md--padding: var(--space-xs) var(--space-md);
		--button--size-md--font-size: var(--font-size-md);
		--button--size-md--height: calc(var(--space-xl) - var(--space-xs));
		--button--size-lg--height: calc(var(--size-xl) + var(--space-sm));
		--button--variant-primary--bg-color: var(--indigo-400);
		--button--variant-primary--bg-color--hover: var(--indigo-700);
		--button--variant-primary--bg-color--active: var(--indigo-400);
		--button--variant-primary--color-text: white;
		--button--variant-primary--border-color: var(--indigo-400);
		--button--variant-outline--border-color: var(--primary-border-color);
		--button--variant-outline--border-color--active: var(--indigo-700);
		--button--variant-outline--border-color--hover: var(--indigo-400);
		--button--variant-outline--color-text: var(--color-text);
		--button--variant-default--color-text: var(--color-text);
		--button--size-md--padding: var(--space-sm) var(--size-lg);

		color: var(--text--color);
		font-weight: var(--font-weight-regular);
		border-radius: var(--border-radius-xl);
		display: flex;
		justify-content: center;
		text-decoration: none;
		align-items: center;
		border: 1px solid transparent;
		outline: 2px solid transparent;
	}

	/* <------ SIZE ------> */
	.button--size-md {
		padding: var(--button--size-md--padding);
		font-size: var(--button--size-md--font-size);
		height: var(--button--size-md--height);
	}
	.button--size-lg {
		height: var(--button--size-lg--height);
	}
	.button--size-lg :global(svg) {
		height: var(--size-lg);
		width: var(--size-lg);
	}
	/* <------ SIZE ------> */

	/* <------ VARIANT ------> */
	.button--variant-primary {
		background-color: var(--button--variant-primary--bg-color);
		color: var(--button--variant-primary--color-text);
		border-color: var(--button--variant-primary--border-color);
	}
	.button--variant-primary:hover {
		background-color: var(--button--variant-primary--bg-color--hover);
	}
	.button--variant-primary:active {
		background-color: var(--button--variant-primary--bg-color--active);
	}
	.button--variant-primary:disabled {
		opacity: 0.65;
		cursor: not-allowed;
		background-color: var(--button--variant-primary--bg-color);
	}
	.button--variant-primary :global(svg) {
		fill: var(--button--variant-primary--color-text);
		color: var(--button--variant-primary--color-text);
	}

	.button--variant-outline {
		background-color: transparent;
		color: var(--button--variant-outline--color-text);
		border-color: var(--button--variant-outline--border-color);
	}
	.button--variant-outline:hover {
		border-color: var(--button--variant-outline--border-color--hover);
	}
	.button--variant-outline:active {
		border-color: var(--button--variant-outline--border-color--active);
	}

	.button--variant-default {
		background: transparent;
		color: var(--button--variant-default--color-text);
	}
	/* <------ VARIANT ------> */
</style>
