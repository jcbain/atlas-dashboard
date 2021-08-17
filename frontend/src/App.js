import './App.css';
import Setup from './components/setup/Setup';
import Dashboard from './components/dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "react-query";
import styled from 'styled-components';

function App() {
	const queryClient = new QueryClient();

	return (
		<Wrapper>
			<PagesContainer>
				<QueryClientProvider client={queryClient}>
					<Switch>
						<Route path='/setup' exact component={ Setup }/>
						<Route path='/datavis' exact component={ Dashboard }/>
					</Switch>
				</QueryClientProvider>
			</PagesContainer>
		</Wrapper>
	);
}

export default App;

const Wrapper = styled.div`
	display: flex;
	height: 100vh;
`

const PagesContainer = styled.div`
	padding: 2rem 1rem;
	width: 100%;
	max-width: 96rem;
	margin-left: auto;
	margin-right: auto;
`
