import * as React from 'react';
import { useState, useEffect } from 'react';
import { EntryOptionPlugin } from 'webpack';
import { BASE_PATH } from './basePath';

const App = (props: AppProps) => {
	const [recipes, setRecipes] = useState<RecipeEntry[] | null>();
	const [name, setName] = useState<string>('');
	const [url, setUrl] = useState<string>('');
	
	const [queryResult, setQueryResult] = useState<string>('');

	const [deleteConfirmationIndex, setDeleteConfirmationIndex] = useState<Number>(-1);

	type RecipeEntry = {
		id: string;
		name: string;
		url: string;
		dateCreated: string;
	};

	function ToLocalTimestamp(time: string) {
		return new Date(time.replace(" ", "T") + "Z").toLocaleString(undefined, {
			dateStyle: "medium",
			timeStyle: "short",
		})
	}

	async function getAllRecipes() {
		try {
			const response = await fetch(`${BASE_PATH}/api/getAllRecipes`);
			const data = await response.json();
			setRecipes(data);
		} catch (error) {
			console.log(error);
		}
	}

	async function SaveRecipe() {
		if (url.trim() === "") {
			return;
		}

		try {
			const res = await fetch(`${BASE_PATH}/api/saveRecipe`, {
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

			setQueryResult(`Success, ${responseBody["affectedRows"]} affected row(s)`);
			
			setName('');
			setUrl('');

			await getAllRecipes();
		} catch (error) {
			console.error(error);
		}
	}

	async function DeleteRecipe(recipeID: Number) {
		setDeleteConfirmationIndex(-1);

		console.log("deleting");

		const res = await fetch(`${BASE_PATH}/api/deleteRecipe`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				"id": recipeID
			})
		});
		
		const resBody = await res.json();

		setQueryResult(`Delete successful, ${resBody["affectedRows"]} affected row(s)`);

		await getAllRecipes();
	}

	function EditRecipe(recipeID: Number) {
	}

	function ShowDeleteConfirmation(recipeId: Number) {
		setDeleteConfirmationIndex(recipeId);
	}
	
	function ClearDelete() {
		setDeleteConfirmationIndex(-1);
	}

	useEffect(() => {
		getAllRecipes();
	}, []);

	return (
		<main className="container my-5">
			<h1 className="text-primary text-center">Recipe List</h1>

			<table>
				<thead>
					<tr>
						{Object.keys((recipes && recipes[0]) || {})
							.filter((column) => column !== "id")
							.map((header: string) => (
								<th key={header}>{header}</th>
							))
						}
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{recipes?.map((entry : RecipeEntry) => (
						<tr key={entry.id}>
							<td>{entry.name}</td>
							<td><a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.url}</a></td>
							<td>{ToLocalTimestamp(entry.dateCreated)}</td>
							<td>
								<img src={BASE_PATH + ((Number(entry.id) !== deleteConfirmationIndex) ?
										"/icons/trash-svgrepo-com.svg" : "/icons/circle-check-svgrepo-com.svg")}
									alt="delete" width="16" height="16"
									onClick={() => {
										if ((Number(entry.id) !== deleteConfirmationIndex)) {
											// confirm recipe delete
											ShowDeleteConfirmation(Number(entry.id));
										}
										else {
											// first delete
											DeleteRecipe(Number(entry.id))
										}
									}} />

								<img src={BASE_PATH + ((Number(entry.id) !== deleteConfirmationIndex) ?
										"/icons/pen-svgrepo-com.svg" : "/icons/ban-svgrepo-com.svg")}
									alt="edit" width="16" height="16"
									onClick={() => {
										if ((Number(entry.id) !== deleteConfirmationIndex)) {
											// edit button
											EditRecipe(Number(entry.id))
										} else {
											// Cancle delete button
											ClearDelete();
										}
									}} />
							</td>
						</tr>
					))}
				</tbody>
			</table>

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
