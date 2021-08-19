import Setup from './components/setup/Setup';
import Dashboard from './components/dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "react-query";
import styled, { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { switchTheme } from './state/actions/actions';
import { lightTheme } from './themes/LightTheme.theme';

function App() {
	const queryClient = new QueryClient();
	const theme = useSelector((state) => state.themeReducer.theme)
	const dispatch = useDispatch();

	return (
		<ThemeProvider theme={theme}>
			<Wrapper>
				<ContentArea>
					<button onClick={() => dispatch(switchTheme(lightTheme))}>Light Theme</button>
					<PagesContainer>
						<QueryClientProvider client={queryClient}>
							<Switch>
								<Route path='/setup' exact component={ Setup }/>
								<Route path='/datavis' exact component={ Dashboard }/>
							</Switch>
						</QueryClientProvider>
					</PagesContainer>
				</ContentArea>
			</Wrapper>
		</ThemeProvider>
	);
}

export default App;

const Wrapper = styled.div`
	display: flex;
	height: 100vh;
	overflow: hidden;
`

const ContentArea = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 0%;
	overflow-y: auto;
	overflow-x: hidden;
	background-color: ${props => props.theme.dashboardBackground};
`

const PagesContainer = styled.div`
	padding: 2rem 1rem;
	width: 100%;
	max-width: 96rem;
	margin-left: auto;
	margin-right: auto;
`
