<script>

	export let all_outcomes;
	export let all_blooms_verbs;

	let outcomes = all_outcomes;
	let yearFilter = "All";
	let typeFilter = "All";
	let moduleFilter = "All";

	let applyFilters = (newYearFilter, newTypeFilter, newModuleFilter) => {
		yearFilter = newYearFilter ? newYearFilter : yearFilter;
		typeFilter = newTypeFilter ? newTypeFilter : typeFilter;
		moduleFilter = newModuleFilter ? newModuleFilter : moduleFilter;
		if (newYearFilter) {
			moduleFilter = "All";
		}
		outcomes = all_outcomes;
		outcomes = yearFilter != "All" ? outcomes.filter(({year}) => year === yearFilter) : outcomes;
		outcomes = typeFilter != "All" ? outcomes.filter(({type}) => type === typeFilter) : outcomes;
		outcomes = moduleFilter != "All" ? outcomes.filter(({module}) => module === moduleFilter) : outcomes;
		modules = yearFilter != "All" ? all_modules.filter(({year}) => year === yearFilter).map(({module}) => module) : [];
	}

	let filterOutcomesByYear = yearFilter => applyFilters(yearFilter);
	let filterOutcomesByType = typeFilter => applyFilters(undefined, typeFilter);
	let filterOutcomesByModule = moduleFilter => applyFilters(undefined, undefined, moduleFilter);

	let typeColors = new Map([
		["Agile Skill", "pink"],
		["Business Context", "skyblue"],
		["Metaskills", "orange"],
		["Security Content", "red"],
		["Technical Content", "green"]
	]);

	let types = [
		"Agile Skill",
		"Business Context",
		"Metaskills",
		"Security Content",
		"Technical Content"
	];
	let getTypeColour = (type) => 'background-color: ' + typeColors.get(type);

	let allMeasurableVerbs = [];
	let bloomsMeasurableVerbs = [];
	let false_positive_verbs = [
		'value',
		'complete',
		'rate',
		'schedule',
		'test',
		'use'
	]

	all_blooms_verbs.forEach(type => bloomsMeasurableVerbs.push(...type.verbs));

	for (let verb of bloomsMeasurableVerbs) {
		if (!false_positive_verbs.includes(verb)) {
			allMeasurableVerbs.push(verb);
			allMeasurableVerbs.push(verb.charAt(0).toUpperCase() + verb.slice(1));
		}
	}

	let getHighlightedText = (text) => {
		let highlightedText = text;
		allMeasurableVerbs.forEach(verb => {
			highlightedText = highlightedText.replaceAll(verb + ' ', '<span style="color: black; font-weight: bold; background-color: lightyellow">' + verb + '</span> ');
		});
		return highlightedText;
	}

	let modules = [];
	let all_modules = [];
	let uniqueModules = [];

	outcomes.forEach(outcome => {
		if (!uniqueModules.includes(outcome.module)) {
			uniqueModules.push(outcome.module)
			all_modules.push({module: outcome.module, year: outcome.year});
		}
	})

	let darkMode = false;
	const toggleDarkMode = () => {
		darkMode = !darkMode;
		window.document.body.classList.toggle('dark-mode')
	}

</script>

<main>
	<button class="toggleBtn" on:click={toggleDarkMode}>
		{#if darkMode }
			Light mode
		{:else}
			Dark mode
		{/if}
	</button>
	<div class="content">
		<div class="filters">
			<button class="{yearFilter === 1 ? 'filterSelected' : ''}" on:click={() => filterOutcomesByYear(1)}>Year 1</button>
			<button class="{yearFilter === 2 ? 'filterSelected' : ''}" on:click={() => filterOutcomesByYear(2)}>Year 2</button>
			<button class="{yearFilter === 3 ? 'filterSelected' : ''}" on:click={() => filterOutcomesByYear(3)}>Year 3</button>
			<button class="{yearFilter === 4 ? 'filterSelected' : ''}" on:click={() => filterOutcomesByYear(4)}>Year 4</button>
			<button class="{yearFilter === 'All' ? 'filterSelected' : ''}" on:click={() => filterOutcomesByYear("All")}>All years</button>
		</div>
		<div class="filters">
			{#each types as type}
				<button class="{typeFilter === type ? 'filterSelected' : ''}" on:click={() => filterOutcomesByType(type)}>{type}</button>
			{/each}
			<button class="{typeFilter === 'All' ? 'filterSelected' : ''}" on:click={() => filterOutcomesByType("All")}>All types</button>
		</div>
		<div class="filters"> 
			{#each modules as module}
			<button class="{moduleFilter === module ? 'filterSelected' : ''}" on:click={() => filterOutcomesByModule(module)}>{module}</button>
			{/each}
			{#if modules.length > 0}
			<button class="{moduleFilter === 'All' ? 'filterSelected' : ''}" on:click={() => filterOutcomesByModule("All")}>All modules</button>
			{/if}
		</div>
		<div class="message">
			<p>Blooom's measurable verbs have been highlighted for clarity, to ensure the outcomes are answered appropriately. <p>
			<p>This functionality makes use of the verbs described in "Bloom’s Taxonomy of Measurable Verbs" avaliable as a pdf <a href="https://www.utica.edu/academic/Assessment/new/Blooms%20Taxonomy%20-%20Best.pdf">here.</a>  </p>
		</div>
		<div class="outcomes">
			{#each outcomes as outcome}
				<div class="outcome">
					<div class="heading">
						<h1 class="lo_code">
							{outcome.lo_code}
						</h1>
						<span class="type" style="{getTypeColour(outcome.type)}">{outcome.type.split(" ")[0]}</span>
					</div>
					<h2 class="module" >{outcome.module}</h2>
					<span class="lo_text">{@html getHighlightedText(outcome.lo_text)}</span>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>

	:global(body) {
		background-color: white;;
		transition: background-color 0.3s
	}
	:global(body.dark-mode) {
		background-color: rgb(13, 19, 24);
		color: white;
	}
	:global(body.dark-mode) a {
		color: lightblue;	
	}

	.toggleBtn {
		position: absolute;
		top: 2vh;
		right: 2vw;
	}
	.outcomes { 
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1vh 2vw;
		margin-top: 2vh;
	}
	.filters {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1vh 1vw;
		margin: 1vh 0;
	}
	.outcome {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 2em;
		max-width: 320px;
	}
	.type {
		border: 1px solid #ccc;
		padding: 0.5rem 1.2rem;
		border-radius: 2em;
		color: white;
		width: 4rem;
		font-size: 1.2rem;
		text-align: center;
		justify-content: center;
		align-items: center;
		display: flex;
		max-height: 50px;
	}
	.heading {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.filterSelected {
		background: lightblue;
	}
	button {
		border: 1px solid #ccc;
		border-radius: 2em;
		padding: 1rem;
	}
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2vh 2vw;
	}
	.content {
		max-width: 1920px;
		width: 100%;
	}
	
	.message {
		border: 1px solid #ccc;
		padding: 0.5rem 1.2rem;
		border-radius: 2em;
		width: fit-content;
	}
</style>
