import * as React from 'react';
import { useState, useEffect } from 'react';
import { BASE_PATH } from './basePath';
import { Routes, Route, Link } from 'react-router-dom';

import Recipe from './pages/Recipe';
import Home from './pages/Home';

const App = () => {
	return (
		<>
			<nav className="app-nav">
				<Link to="/">Home</Link>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/view" element={<Recipe />} />
			</Routes>
		</>
	);
};

export default App;
