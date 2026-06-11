import * as React from 'react';
import { useState, useEffect } from 'react';
import { EntryOptionPlugin } from 'webpack';

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
	// const [greeting, setGreeting] = useState<string>('');
	const [allRecipes, setAllRecipes] = useState<JSX.Element | null>(null);

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
					{Object.keys(data[0]).map((header: string) => (
						<th>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((entry) => (
					<tr key={entry.id}>
						<td>{entry.id}</td>
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

	useEffect(() => {
		getAllRecipes();
	}, []);

	return (
		<main className="container my-5">
			<h1 className="text-primary text-center">Recipe List</h1>
			{allRecipes}
		</main>
	);
};

interface AppProps {}

export default App;
