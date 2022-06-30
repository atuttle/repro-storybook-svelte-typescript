<script lang="ts">
	export let value
	export let validateOnChange = false
	export let validator = async (value: string): Promise<{isValid: boolean | undefined, message: string}> => {
		console.log(value) //set a default behaviour
		return {
			isValid: undefined,
			message: ''
		}
	}

	const {'class': classes, ...props} = $$restProps

	let isValid: boolean | undefined = undefined
	let validationMessage = ''

	async function validate() {
		const returnInfo = await validator(value)
		isValid = returnInfo.isValid
		validationMessage = returnInfo.message
	}
</script>

<div>
	<input
		class="border border-gray-500 rounded px-3 py-2 {classes}"
		class:valid={isValid}
		class:invalid={isValid === false}
		{...props}
		bind:value
		on:input={validateOnChange && validate}
	/>
	{#if isValid}
		<span class="valid">
			Input is Valid
		</span>
	{:else if isValid === false}
		<span class="validationMessage">
			{validationMessage}
		</span>
	{/if}
</div>

<style>
	.valid {
		@apply border-green-500 bg-white-100;
	}
	.invalid {
		@apply border-red-500 bg-red-200;
	}
</style>
