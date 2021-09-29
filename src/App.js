import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading/Loading';
import DashBoard from './components/DashBoard/DashBoard';
import Detect from './components/Detect/Detect';
import Stretching from './components/Stretching/Stretching';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					<Loading />
				</Route>
				<Route path="/home" exact>
					<DashBoard />
				</Route>
				<Route path="/detect" exact>
					<Detect />
				</Route>
				<Route path="/stretching" exact>
					<Stretching />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
