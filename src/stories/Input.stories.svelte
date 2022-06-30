<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Input from '../lib/Input.svelte';

	const exampleValidator = async (value) => {
		if (value.trim() !== '42') {
			return {
				isValid: false,
				message: 'The only correct value is 42.'
			}
		}
		return {
			isValid: true,
			message: ''
		};
	};
</script>

<Meta title="Input" component={Input} />

<Template let:args>
	<Input {...args} />
</Template>

<Story
	name="Vanilla"
	args={{
		type: 'text',
		name: 'cheese',
		id: 'cheese',
		value: '',
		placeholder: 'placeholder text',
		block: false,
		class: ''
	}}
/>

<Story
	name="AutoValidating"
	args={{
		type: 'text',
		value: '',
		placeholder: 'placeholder text',
		validateOnChange: true,
		accentuateValid: true,
		validator: exampleValidator
	}}
/>
