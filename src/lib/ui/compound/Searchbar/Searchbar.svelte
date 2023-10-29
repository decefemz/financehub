<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Input from '../../primitive/Input';
	import Magnify from 'svelte-material-icons/Magnify.svelte';
	import { debounceAsync } from '../../../helpers/debounce';

	let form: HTMLFormElement;

	let results: any;
	let loading: boolean = false;

	interface SearchBarProps {
		placeholder?: string;
		size: 'md' | 'lg';
		action?: string;
	}
	export let placeholder: SearchBarProps['placeholder'];
	export let size: SearchBarProps['size'] = 'md';
	export let action: SearchBarProps['action'];

	let isResultTrayOpen: boolean = false;

	const debouncedSubmit = debounceAsync(async () => form.requestSubmit(), 500);

	const requestSubmit: () => void = () => {
		debouncedSubmit();
	};

	const onSubmit: SubmitFunction = ({ cancel }) => {
		return async (e) => {
			const { update, result }: { update: typeof e.update; result: any } = e;
			console.log(result.data.quotes);
			results = result.data.quotes;
			await update({ reset: false });
		};
	};
</script>

<form bind:this={form} class="search-bar" use:enhance={onSubmit} {action} method="POST">
	<div class="search-bar__input-container">
		<Magnify />
		<Input
			name="query"
			{size}
			on:input={requestSubmit}
			on:focus={() => (isResultTrayOpen = true)}
			on:blur={() => (isResultTrayOpen = false)}
			{placeholder}
			class="search-input {isResultTrayOpen && 'open-tray'}"
		/>
	</div>
	{#if isResultTrayOpen}
		<div class="search-results-box" />
	{/if}
</form>

<style>
	.search-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		max-width: 500px;
		padding-bottom:0;
		width: 100%;
	}
	.search-bar__input-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	:global(.search-bar__input-container svg) {
		width: calc(var(--size-sm) + var(--size-xs));
		height: calc(var(--size-sm) + var(--size-xs));
		transform: translate(var(--space-xl), -1px);
		color: var(--color-text-weakest);
		position: absolute;
		left: calc(var(--size-lg) * -1);
		z-index: 2;
	}
	:global(.search-input) {
		padding-inline: calc(var(--space-xl) + var(--space-xs)) var(--space-sm) !important;
		width: 100%;
	}

	.search-results-box {
		position: absolute;
		background-color: white;
		left: 0;
		top: calc(var(--size-xl) + 6px);
		width: 100%;
		border: 1px solid var(--primary-border-color);
		/* box-shadow: var(--box-shadow-md); */
		padding: var(--space-md);
		border-bottom-left-radius: 22px;
		border-bottom-right-radius: 22px;
	}

	:global(.open-tray) {
		z-index: 1;
		border-bottom-left-radius: 0px !important;
		border-bottom-right-radius: 0px !important;
	}
</style>
