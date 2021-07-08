import './App.css';
import Setup from './components/setup/Setup';
import Dashboard from './components/dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "react-query"

function App() {
	const queryClient = new QueryClient();

	return (
		<div className="m-5">
			<QueryClientProvider client={queryClient}>
              <Switch>
                <Route path='/setup' exact component={ Setup }/>
				<Route path='/datavis' exact component={ Dashboard }/>
              </Switch>
          	</QueryClientProvider>
		</div>
	);
}

export default App;
