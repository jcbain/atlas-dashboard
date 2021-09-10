import { useEffect } from 'react';
import Dropdown from './Dropdown';
import { useParameters } from '../../../hooks';
import styled from 'styled-components';

const Parameters = ({ state, updateTab, paramName }) => {
    const { parameters, setParameters }  = useParameters(state, paramName);
    const isStatic = state.isStatic;

    useEffect(() => {
        updateTab(paramName, parameters);
    }, [parameters]);

    return (
        <ParametersWrapper isStatic={isStatic}>
            <Dropdown
                parameters={parameters}
                setParameters={setParameters}
                state={state}
            />
        </ParametersWrapper>
    );
}
export { Parameters }

const ParametersWrapper = styled.div`
    display: flex;
    flex-direction: ${props => props.isStatic ? 'row' : 'column'};
    border-bottom: ${props => props.isStatic  ? 'thick'  : '0px'} double ${props => props.theme.chartCardOutline};
    padding-bottom: 1rem;
`