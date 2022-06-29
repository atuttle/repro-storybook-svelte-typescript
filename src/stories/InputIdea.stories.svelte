<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
	import InputIdea from "../lib/InputIdea.svelte"

	let isInputValid = false

	function handleInputChange(event) {
		console.log(event.detail) //event.detail has the data send by dispatch example: https://svelte.dev/tutorial/component-events
		isInputValid = !isInputValid // just for the invalid valid effect insert function here.
	}
</script>

<Meta title="InputIdea" component={InputIdea} />

<Template let:args>
	<InputIdea {...args} invalid="{isInputValid}" on:inputChange={handleInputChange} />
</Template>

<Story
	name="Vanilla"
	args={{
		type: 'text',
		name: 'cheese',
		id: 'cheese',
		placeholder: 'placeholder text',
		block: false,
		class: 'some-classes-given-by-parent'
	}}
/>
