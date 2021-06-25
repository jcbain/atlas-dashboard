import './App.css';
import Parameters from './components/parameters/Parameters'
import { Route, Switch, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { FileUpload, DataTable } from './components/setup';

function App() {
	const renderSteps = (props) => {
		const currStep = window.location.search;
		const values = queryString.parse(currStep);
		let step = values.step;
		
		if (step === '1') {return <FileUpload {...props}/>}
		if (step === '2') {return <DataTable {...props}/>}
	}

	return (
		<div className="container mt-5">
			<div>
				<Switch>
					<Route path='/setup' render={props => renderSteps(props)}/>
					<Route path='/datavis' component={ Parameters }/>
				</Switch>
			</div>
		</div>
	);
}

export default App;
