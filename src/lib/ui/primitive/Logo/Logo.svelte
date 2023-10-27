<script lang="ts">
	interface LogoProps {
		variant: 'icon' | 'full';
		size: 'sm' | 'md' | 'lg';
	}

	export let variant: LogoProps['variant'] = 'full';
	export let size: LogoProps['size'] = 'md';
</script>

{#if variant === 'full'}
	<div
		class="full-logo"
		style=" min-width:128px;
            width:128px; 
            height:33px; 
            border-radius:var(--border-radius-lg); 
            background:var(--grey-200);
        "
	/>
{:else if variant === 'icon'}
	<div
		class="__visible-at-768px __hidden-at-500px icon-logo"
		style=" min-width:var(--input--size-md--height); 
                width:33px; 
                height:33px; 
                border-radius:var(--border-radius-md); 
                background:var(--grey-200);
            "
	/>
{/if}
