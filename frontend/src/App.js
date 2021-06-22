import './App.css';
import FileUpload from './components/FileUpload'
import DataTable from './components/Table'
import Parameters from './components/parameters/Parameters'
import { Route, Switch, useLocation } from 'react-router-dom';

function App() {
	let step = 1;

	try {
		const location = useLocation();
		let p = location.search;
		step = parseInt((p.split('step=')[1]))
	} catch (err) {
		console.log(err)
	}

	return (
		<div className="container mt-5">
			<div>
              <Switch>
                <Route path='/setup' exact component={ step===2 ? DataTable : FileUpload }/>
				<Route path='/datavis' exact component={ Parameters }/>
              </Switch>
          	</div>
		</div>
	);
}

export default App;
