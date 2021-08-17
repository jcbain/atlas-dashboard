import { ConstantParamBar, StaticSwitch } from "./states";
import { Parameters } from "./parameters";
import { Charts } from "./charts";
import styled from "styled-components";

const TabContents = ({ state, updateTab }) => {
    const isStatic = state.isStatic;

    return (
        <DashboardWrapper>
            <HeaderContainer>
                <ConstParamContainer>
                    <ConstantParamBar state={state} />
                </ConstParamContainer>
            </HeaderContainer>
            <ChartsWrapper>
                <div>
                    <Charts
                        state={state}
                        updateTab={updateTab}
                    />
                </div>
            </ChartsWrapper>
            <ParamContainer>
                <StaticSwitch state={state} updateTab={updateTab} />
                {
                    !isStatic &&
                    <Parameters state={state}
                        updateTab={updateTab}
                        paramName={'global'}
                    />
                }
            </ParamContainer>
            
        </DashboardWrapper>
    )
}

export default TabContents;

const DashboardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 1.5rem;
`
const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 1 / -1;

    @media (min-width: 1280px) {
        grid-column: span 12 / span 12;
    }
`
const ConstParamContainer = styled.div`
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`
const ChartsWrapper = styled.div`
    @media (min-width: 640px) {
        grid-column: span 12 / span 12;
    }
    @media (min-width: 1280px) {
        grid-column: span 9 / span 9;
    }
`
const ParamContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 640px) {
        grid-column: span 12 / span 12;
    }
    @media (min-width: 1280px) {
        grid-column: span 3 / span 3;
    }
`