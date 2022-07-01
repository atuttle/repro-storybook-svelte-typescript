<script lang="ts">
	type ValidationStatus = 'initial' | 'invalid' | 'valid';

	//this is how you accept class names as a prop named "class" in svelte
	let propClasses = '';
	export { propClasses as class };

	export let name: string;
	export let type = 'text';
	export let id: string | null = null;
	export let value = '';
	export let placeholder: string | null | undefined = null;
	const props = { name, type, id, placeholder };

	export let validateOnChange = false;
	export let validator: CallableFunction | null | undefined = null;
	let validationStatus: ValidationStatus = 'initial';
	let validationMessage = '';
	let validationClasses = '';

	let inputClasses: string;
	$: inputClasses =
		'border border-gray-500 rounded px-3 py-2 ' + validationClasses + ' ' + propClasses;
	$: validationClasses =
		validationStatus === 'initial'
			? ''
			: validationStatus === 'invalid'
			? 'border-red-500 bg-red-200'
			: 'border-green-500 bg-white-100';

	const autovalidate = () => (validateOnChange ? validate() : null);
	export const validate = async () => {
		if (!validator) {
			return;
		}
		validationMessage = await validator(value);
		if (validationMessage.trim() === '') {
			validationStatus = 'valid';
		} else {
			validationStatus = 'invalid';
		}
	};

	//if a value is provided at load/mount, validate it
	if (value !== '') {
		validate();
	}
</script>

<input
	class={inputClasses}
	{...props}
	bind:value
	on:keyup={autovalidate}
	on:change={autovalidate}
/>
{#if validationStatus === 'valid'}
	<span class="valid" />
{:else if validationStatus === 'invalid'}
	<span class="validationMessage">{validationMessage}</span>
{/if}
