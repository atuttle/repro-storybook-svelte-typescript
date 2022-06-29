<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Input from '../lib/Input.svelte';

	/* This is how it would work, but it makes Storybook barf :( */
	// const exampleValidator = (currentValue: string) => {
	// 	if (currentValue.trim() !== '42') {
	// 		return 'The only correct value is 42.';
	// 	}
	// 	return '';
	// };
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
		/* This is how it would work, but it makes Storybook barf :( */
		// validator: exampleValidator,
		accentuateValid: true
	}}
/>
