import './App.css';
import Setup from './components/setup/Setup';
import Parameters from './components/parameters/Parameters'
import { Route, Switch, useLocation } from 'react-router-dom';

function App() {
	// let step = 1;

	// try {
	// 	const location = useLocation();
	// 	let p = location.search;
	// 	step = parseInt((p.split('step=')[1]))
	// } catch (err) {
	// 	console.log(err)
	// }

	return (
		<div className="container mt-5">
			<div>
              <Switch>
                <Route path='/setup' exact component={ Setup }/>
				<Route path='/datavis' exact component={ Parameters }/>
              </Switch>
          	</div>
		</div>
	);
}

export default App;
