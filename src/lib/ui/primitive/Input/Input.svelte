<script lang="ts">
	import Text from '../Text/';

	interface InputProps {
		variant: 'primary';
		description?: string;
		error?: string;
		size: 'md' | 'lg';
	}

	export var variant: InputProps['variant'] = 'primary';
	export let description: InputProps['description'] = '';
	export let error: InputProps['error'] = '';
	export let size: InputProps['size'] = 'md';
</script>

<span class="input-container">
	<input
		on:blur
		on:focus
		on:input
		{...$$restProps}
		class="
            {error ? 'input--error' : ''} 
            input--variant-{variant} 
			input--size-{size} 
            {$$restProps.class}
            "
	/>
	{#if !error}
		<Text
			size="sm"
			color="weakest"
			class="input__description {$$restProps.disabled ? 'disabled' : ''}">{description}</Text
		>
	{:else}
		<Text size="sm" color="red" class="input__error">{error}</Text>
	{/if}
</span>

<style>
	.input-container {
		--input--variant-primary--border-color: var(--grey-300);
		--input--variant-primary--border-color--hover: var(--grey-400);
		--input--variant-primary--border-color--focus: var(--indigo-400);
		--input--variant-primary--border-color--disabled: var(--grey-200);
		--input--variant-primary--bg-color--disabled: var(--grey-50);
		--input--variant-primary--text-color--disabled: var(--grey-500);
		--input--size-md--font-size: var(--font-size-md);
		--input--size-md--height: calc(var(--space-xl) - var(--space-xs));
		--input--size-lg--height: calc(var(--size-xl) + var(--space-sm));
		--input--size-md--radius: 18px;

		width: 100%;
		display: flex;
		flex-direction: column;
	}
	input {
		font-weight: 500;
		border: 1px solid transparent;
		font-size: var(--font-size-md);
		font-family: var(--font-family);
		border: 1px solid transparent;
		width: 100%;
		outline: none;
	}

	/* <------ INPUT SIZE ------> */
	.input--size-md {
		padding: var(--input--size-md--padding);
		font-size: var(--input--size-md--font-size);
		height: var(--input--size-md--height);
		border-radius: var(--border-radius-lg);
	}
	.input--size-lg {
		padding: var(--input--size-md--padding);
		font-size: var(--input--size-md--font-size);
		height: var(--input--size-lg--height);
		border-radius: 22px;
	}
	/* <------ INPUT SIZE ------> */
	/* <------ INPUT VARIANTS ------> */
	.input--variant-primary {
		color: var(--color-text);
		border-color: var(--input--variant-primary--border-color);
	}
	.input--variant-primary:hover {
		border-color: var(--input--variant-primary--border-color--hover);
	}
	.input--variant-primary:focus {
		border-color: var(--input--variant-primary--border-color--focus);
	}
	.input--variant-primary:disabled {
		background-color: var(--input--variant-primary--bg-color--disabled);
		border-color: var(--input--variant-primary--border-color--disabled);
		color: var(--input--variant-primary--text-color--disabled);
	}
	:global(.input__description.disabled) {
		color: var(--input--variant-primary--text-color--disabled);
	}
	/* <------ INPUT VARIANTS ------> */

	.input--error {
		border-color: var(--color-text-red) !important;
		color: var(--color-text-red) !important;
	}
	.input--error::placeholder {
		color: var(--color-text-red) !important;
	}
	:global(.input__description) {
		font-style: italic;
		padding-inline: var(--size-md);
		padding-top: 4px;
	}
	:global(.input__error) {
		padding-inline: var(--size-md);
	}
</style>
