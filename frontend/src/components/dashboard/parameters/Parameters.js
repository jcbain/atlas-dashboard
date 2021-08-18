import { useEffect } from 'react';
import Dropdown from './Dropdown';
import { useParameters } from '../../../hooks';
import styled from 'styled-components';

const Parameters = ({ state, updateTab, paramName }) => {
    const { parameters, setParameters }  = useParameters(state, paramName);

    useEffect(() => {
        updateTab(paramName, parameters);
    }, [parameters]);

    return (
        <ParametersWrapper>
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
    flex-direction: row;
    border-width: 1px;
    border-radius: 0.25rem;
    padding: 1rem;
`