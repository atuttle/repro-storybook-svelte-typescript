<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
	import InputIdea from "../lib/InputIdea.svelte"

	const type = 'text'
	const placeholder = 'Some Text Here'
	const validationFunction = (value) => {
		console.log('Using external ValidationFunction')
		return value.match(/[A-Z]/g)
	}
</script>

<Meta title="InputIdea" component={InputIdea} />

<Template let:args>
	<InputIdea {...args} />
</Template>

<Story
	name="Vanilla"
	args={{
		type,
		name: 'cheese',
		id: 'cheese',
		placeholder,
		validationFunction,
		block: false,
		class: 'some-classes-given-by-parent'
	}}
/>
