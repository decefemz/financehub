<script lang="ts">
	import Spinner from '../Spinner/Spinner.svelte';

	type ButtonProps = {
		variant: 'primary' | 'outline' | 'default' | 'ghost';
		size: 'md';
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
	{...$$restProps}
	href={to}
	disabled={loading || $$restProps.disabled}
	class="
        button
        button--variant-{variant}
        button--size-{size}
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
		--primary-border-color: var(--grey-300);

		--button--size-md--padding: var(--space-xs) var(--space-md);
		--button--size-md--font-size: var(--font-size-md);
		--button--size-md--height: calc(var(--space-xl) - var(--space-xs));

		--button--variant-primary--bg-color: var(--indigo-400);
		--button--variant-primary--bg-color--hover: var(--indigo-700);
		--button--variant-primary--bg-color--active: var(--indigo-400);
		--button--variant-primary--text-color: white;
		--button--variant-primary--border-color: var(--indigo-400);

		--button--variant-outline--border-color: var(--primary-border-color);
		--button--variant-outline--border-color--active: var(--indigo-700);
		--button--variant-outline--border-color--hover: var(--indigo-400);
		--button--variant-outline--text-color: var(--text-color);

		--button--variant-default--text-color: var(--text-color);

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
	/* <------ SIZE ------> */

	/* <------ VARIANT ------> */
	.button--variant-primary {
		background-color: var(--button--variant-primary--bg-color);
		color: var(--button--variant-primary--text-color);
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
		fill: var(--button--variant-primary--text-color);
		color: var(--button--variant-primary--text-color);
	}

	.button--variant-outline {
		background-color: transparent;
		color: var(--button--variant-outline--text-color);
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
		color: var(--button--variant-default--text-color);
	}
	/* <------ VARIANT ------> */
</style>
