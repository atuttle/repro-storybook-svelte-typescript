This repo exists as a minimal reproduction case / example of struggles I'm having getting Svelte(Kit) and Storybook to play nicely together.

First, SvelteKit was installed for the project using the command: `npm create svelte .`

Then, per [this article](https://storybook.js.org/blog/storybook-for-svelte/), I ran `npx sb init`. It was increibly slow on first run and eventually failed with the following npm error log:

```
5794 verbose stack FetchError: Invalid response body while trying to fetch https://registry.npmjs.org/@storybook%2fcore-common: Socket timeout
5794 verbose stack     at /Users/atcodes/.npm_globals/lib/node_modules/npm/node_modules/minipass-fetch/lib/body.js:162:15
5794 verbose stack     at processTicksAndRejections (node:internal/process/task_queues:96:5)
5795 verbose cwd /Users/atcodes/DEV/tmp
5796 verbose Darwin 21.5.0
5797 verbose argv "/Users/atcodes/n/bin/node" "/Users/atcodes/.npm_globals/bin/npm" "install" "--legacy-peer-deps" "-D" "@storybook/svelte@^6.5.9" "@storybook/addon-links@^6.5.9" "@storybook/addon-essentials@^6.5.9" "@storybook/addon-actions@^6.5.9" "@storybook/addon-interactions@^6.5.9" "@storybook/testing-library@^0.0.13" "svelte@^3.48.0" "svelte-loader@^3.1.3" "@storybook/builder-webpack4@^6.5.9" "@storybook/manager-webpack4@^6.5.9" "@babel/core@^7.18.6" "babel-loader@^8.2.5"
5798 verbose node v16.14.0
5799 verbose npm  v8.5.0
5800 error code ERR_SOCKET_TIMEOUT
5801 error errno ERR_SOCKET_TIMEOUT
5802 error network Invalid response body while trying to fetch https://registry.npmjs.org/@storybook%2fcore-common: Socket timeout
5803 error network This is a problem related to network connectivity.
5803 error network In most cases you are behind a proxy or have bad network settings.
5803 error network
5803 error network If you are behind a proxy, please make sure that the
5803 error network 'proxy' config is set properly.  See: 'npm help config'
5804 verbose exit 1
5805 timing npm Completed in 196932ms
5806 verbose unfinished npm timer reify 1656526189148
5807 verbose unfinished npm timer reify:loadTrees 1656526189150
5808 verbose code 1
5809 error A complete log of this run can  be found in:
5809 error     /Users/atcodes/.npm/_logs/2022-06-29T18_09_49_047Z-debug-0.log
```

A second attempt of `npx sb init` did finish its install steps and prompted me to install `eslint-plugin-storybook`, which I did accept.

The next problem is that if you try to run `npm run storybook` you get ESM compatibility errors:

```
❯ npm run storybook

> tmp@0.0.1 storybook
> start-storybook -p 6006


info @storybook/svelte v6.5.9
info
ERR! Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/atcodes/DEV/tmp/svelte.config.js from /Users/atcodes/DEV/tmp/.storybook/main.js not supported.
```

The fix for which I found [here](https://blog.logrocket.com/build-your-own-component-library-svelte/)

- In the `.storybook/` folder, rename `main.js` to `main.cjs` and `preview.js` to `preview.cjs`.
- In `main.cjs` comment out these lines:

```js
// "svelteOptions": {
//   "preprocess": require("../svelte.config.js").preprocess
// }
```

Next I installed `npm i -D @storybook/addon-svelte-csf` that I'll need for writing stories.

Then I added a basic input component and story `src/lib/Input.svelte` and `src/stories/Input.stories.svelte`.

This caused TypeScript errors when trying to start `npm run storybook`:

```
ERROR in ./src/lib/Input.svelte
Module build failed (from ./node_modules/svelte-loader/index.js):
Error: ParseError: Unexpected token (2:6)
1: <script lang="ts">
2:   type ValidationStatus = 'initial' | 'invalid' | 'valid';
          ^
```

I found [this Stack Overflow post](https://stackoverflow.com/questions/65116562/how-can-typescript-be-setup-in-storybook-with-svelte/65118222#65118222) describing how to enable TS support with Svelte and Storybook:

Now, `npm run storybook` will start storybook without throwing any errors, and my basic stories work, but they don't show what I need them to show, which is validation in action.

So now I un-comment the validation parts of the story. They were initially commented because I had hit this problem before starting this reproduction-case repository.

Restarting `npm run storybook`, it now shows no errors in the CLI, and this message in the browser:

> Couldn't find any stories in your Storybook.
