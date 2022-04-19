<script>
	import Router from "svelte-spa-router";
	import { wrap } from "svelte-spa-router/wrap";
	import { push, pop, replace } from "svelte-spa-router";

	import Header from "./components/Header.svelte";
	import Index from "./pages/Index.svelte";
	import Store from "./pages/Store.svelte";
	import Toastr from "./toastr/Toastr.svelte";
	import { baseURL } from "./store/globalStore.js";

	const routes = {
		"/store": wrap({
			component: Store,
			// List of route pre-conditions
			conditions: [
				// First pre-condition function
				async (detail) => {
					const response = await fetch($baseURL + "/authorize", { 
						method: "POST",
						credentials: "include",
						headers: {
							"content-type": "application/json",
						},
					});
					if (response.ok) {
						return true;
					} else {
						return false;
					}
				},
			],
		}),
		"/": Index,
		"*": Index,
	};

	function conditionsFailed(event) {
		//console.error("conditionsFailed event", event.detail);
		if (event.detail.route === "/store") {
			replace("/");
		}

	}
</script>

<main>
	<Header />
	<Router {routes} on:conditionsFailed={conditionsFailed} />
	<Toastr />
</main>

<style>
	:global(html) {
		background-color: darkslategray;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
