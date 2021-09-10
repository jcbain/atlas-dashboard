import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import styled from 'styled-components';

const StaticSwitch = ({ state, updateTab }) => {
    const isStatic = state.isStatic;
    
    return (
        <StaticSwitchWrapper>
            <SwitchTitle>Static</SwitchTitle>
            <BootstrapSwitchButton
                checked={isStatic}
                offstyle="secondary"
                onChange={() => updateTab('isStatic', !isStatic)}
            />
        </StaticSwitchWrapper>
    )
}


export { StaticSwitch };

const StaticSwitchWrapper = styled.div`
    display: flex;
    background-color: ${props => props.theme.paramCardBackground};
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    border-bottom: thick double ${props => props.theme.chartCardOutline};
    margin-bottom: 1rem;
`

const SwitchTitle = styled.h4`
    margin-right: 1rem;
    margin-top: 0.5rem;
`