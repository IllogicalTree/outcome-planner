<script>

	export let all_outcomes;

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

	let modules = [];
	let all_modules = [];
	let uniqueModules = [];

	outcomes.forEach(outcome => {
		if (!uniqueModules.includes(outcome.module)) {
			uniqueModules.push(outcome.module)
			all_modules.push({module: outcome.module, year: outcome.year});
		}
	})

</script>

<main>
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
					<span class="lo_text">{outcome.lo_text}</span>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
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
	}
	.content {
		max-width: 1920px;
		width: 100%;
		padding: 1vh 1vw;
	}
</style>
