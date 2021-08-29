import App from './App.svelte';

import * as outcomes from './outcomes.json';  

const app = new App({
	target: document.body,
	props: {
		all_outcomes: outcomes.default
	}
});

export default app;