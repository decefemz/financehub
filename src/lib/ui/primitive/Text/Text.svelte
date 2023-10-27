<script lang="ts">
	interface TextProps {
		size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
		weight: 'light' | 'regular' | 'medium' | 'strong';
		color: 'default' | 'weak' | 'weakest' | 'red' | 'green' | 'accent';
		as: 'span' | 'label' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	}

	export let size: TextProps['size'] = 'md';
	export let weight: TextProps['weight'] = 'regular';
	export let color: TextProps['color'] = 'default';
	export let as: TextProps['as'] = 'span';
</script>

<svelte:element
	this={as}
	class={`
        text
        text--size-${size}
        text--weight-${weight}
        text--color-${color}
        ${$$restProps.class}
    `}
>
	<slot />
</svelte:element>

<style>
	.text {
		font-family: inter;
	}
	/* <------TEXT SIZE------> */
	.text--size-xs {
		font-size: var(--font-size-xs);
	}
	.text--size-sm {
		font-size: var(--font-size-sm);
	}
	.text--size-md {
		font-size: var(--font-size-md);
	}
	.text--size-lg {
		font-size: var(--font-size-lg);
	}
	.text--size-xl {
		font-size: var(--font-size-xl);
	}
	.text--size-xxl {
		font-size: var(--font-size-xxl);
	}
	/* <------TEXT SIZE------> */
	/* <------TEXT WEIGHT------> */
	.text--weight-light {
		font-weight: var(--font-weight-light);
	}
	.text--weight-regular {
		font-weight: var(--font-weight-regular);
	}
	.text--weight-medium {
		font-weight: var(--font-weight-medium);
	}
	.text--weight-strong {
		font-weight: var(--font-weight-strong);
	}
	/* <------TEXT WEIGHT------> */
	/* <------TEXT COLOR------> */
	.text--color-default {
		color: var(--color-text);
	}
	.text--color-weak {
		color: var(--color-text-weak);
	}
	.text--color-weakest {
		color: var(--color-text-weakest);
	}
	.text--color-red {
		color: var(--color-text-red);
	}
	.text--color-green {
		color: var(--color-text-green);
	}
	.text--color-accent {
		color: var(--color-primary);
	}
	/* <------TEXT COLOR------> */
</style>
