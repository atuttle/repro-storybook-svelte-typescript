module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf'
	],
	framework: '@storybook/svelte'
	// commented per advice here: https://blog.logrocket.com/build-your-own-component-library-svelte/
	// "svelteOptions": {
	//   "preprocess": require("../svelte.config.js").preprocess
	// }
};
