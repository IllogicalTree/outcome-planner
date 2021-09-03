import App from './App.svelte';

import * as outcomes from './outcomes.json';  
import * as bloomsVerbs from './blooms-verbs.json';

const app = new App({
	target: document.body,
	props: {
		all_outcomes: outcomes.default,
		all_blooms_verbs: bloomsVerbs.default
	}
});

export default app;