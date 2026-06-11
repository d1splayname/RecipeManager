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
						<td>{entry.url}</td>
						<td>{entry.dateCreated}</td>
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
			<h1 className="text-primary text-center">Hello!</h1>
			{allRecipes}
		</main>
	);
};

interface AppProps {}

/* CLASS REACT EXAMPLE */
// class App extends React.Component<IAppProps, IAppState> {
// 	constructor(props: IAppProps) {
// 		super(props);
// 		this.state = {
// 			name: null
// 		};
// 	}

// 	async componentDidMount() {
// 		try {
// 			let r = await fetch('/api/hello');
// 			let name = await r.json();
// 			this.setState({ name });
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}

// 	render() {
// 		return (
// 			<main className="container my-5">
// 				<h1 className="text-primary text-center">Hello {this.state.name}!</h1>
// 			</main>
// 		);
// 	}
// }

// export interface IAppProps {}

// export interface IAppState {
// 	name: string;
// }

export default App;
