import * as React from 'react';
import { useState, useEffect } from 'react';
import { EntryOptionPlugin } from 'webpack';

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
	// const [greeting, setGreeting] = useState<string>('');
	const [allRecipes, setAllRecipes] = useState<JSX.Element | null>(null);
	const [name, setName] = useState<string>('');
	const [url, setUrl] = useState<string>('');
	
	const [queryResult, setQueryResult] = useState<string>('');

	const basePath = typeof window !== 'undefined' &&
		window.location.pathname.startsWith('/recipes') ?
		'/recipes' : '';

	type RecipeEntry = {
		id: string;
		name: string;
		url: string;
		dateCreated: string;
	};

	function ToLocalTeimStamp(time: string) {
		return new Date(time.replace(" ", "T") + "Z").toLocaleString(undefined, {
			dateStyle: "medium",
			timeStyle: "short",
		})
	}

	function CreateTable(data: RecipeEntry[]) {
		let table =
		<table>
			<thead>
				<tr>
					{Object.keys(data[0])
						.filter((column) => column !== "id")
						.map((header: string) => (
							<th>{header}</th>
						))
					}
				</tr>
			</thead>
			<tbody>
				{data.map((entry) => (
					<tr key={entry.id}>
						<td key="1">{entry.name}</td>
						<td key="2"><a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.url}</a></td>
						<td key="3">{ToLocalTeimStamp(entry.dateCreated)}</td>
					</tr>
				))}
			</tbody>
		</table>

		return table;
	}

	async function getAllRecipes() {
		try {
			const response = await fetch(`${basePath}/api/getAllRecipes`);
			const data = await response.json();
			setAllRecipes(CreateTable(data));
		} catch (error) {
			console.log(error);
		}
	}

	async function SaveRecipe() {
		if (url.trim() === "") {
			return;
		}

		try {
			const res = await fetch(`${basePath}/api/saveRecipe`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					"name": name,
					"url": url
				}),
			});

			if (!res.ok) {
				throw new Error(`Save failed: ${res.status}`);
			}
 
			const responseBody = await res.json();

			console.log("🚀 ~ SaveRecipe response:", responseBody);

			setQueryResult(`
				Affected Rows: ${responseBody["affectedRows"]}
				Affected Rows: ${responseBody["affectedRows"]}
				Affected Rows: ${responseBody["affectedRows"]}
			`);
			
			setName('');
			setUrl('');

			await getAllRecipes();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getAllRecipes();
	}, []);

	return (
		<main className="container my-5">
			<h1 className="text-primary text-center">Recipe List</h1>
			{allRecipes}
			<h1>Add recipe</h1>
			<label>Name</label>
			<input value={name} onChange={(e) => setName(e.target.value)} />

			<label>URL</label>
			<input value={url} onChange={(e) => setUrl(e.target.value)} />
			<button onClick={SaveRecipe}>Add</button>

			<div>
				<p>result: {queryResult}</p>
			</div>
		</main>
	);
};

interface AppProps {}

export default App;
