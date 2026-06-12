import * as React from 'react';
import { useState, useEffect } from 'react';
import { EntryOptionPlugin } from 'webpack';

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
	// const [greeting, setGreeting] = useState<string>('');
	const [allRecipes, setAllRecipes] = useState<JSX.Element | null>(null);
	const [name, setName] = useState<string>('hello');
	const [url, setUrl] = useState<string>('https://bakerbynature.com/the-best-cocoa-fudge-brownies/#wprm-recipe-container-51261');

	type RecipeEntry = {
		id: string;
		name: string;
		url: string;
		dateCreated: string;
	};

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
						<td>{entry.name}</td>
						<td><a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.url}</a></td>
						<td>{new Date(entry.dateCreated).toLocaleString()}</td>
					</tr>
				))}
			</tbody>
		</table>

		return table;
	}

	async function getAllRecipes() {
		try {
			const response = await fetch("/api/getAllRecipes");
			const data = await response.json();
			setAllRecipes(CreateTable(data));
		} catch (error) {
			console.log(error);
		}
	}

	async function SaveRecipe() {
		try {
			const res = await fetch("/api/saveRecipe", {
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
		</main>
	);
};

interface AppProps {}

export default App;
