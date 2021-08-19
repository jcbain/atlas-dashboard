import { ConstantParamBar, StaticSwitch } from "./states";
import { Parameters } from "./parameters";
import { Charts } from "./charts";
import styled from "styled-components";

const TabContents = ({ state, updateTab }) => {
    const isStatic = state.isStatic;

    return (
        <DashboardWrapper>
            <HeaderContainer>
                <ConstantParamBar state={state} />
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
                <Description isStatic={isStatic}>
                    Results for a two-patch model of migration-selection balance. Migration rate indicates the proportion of individuals in each population that migrated from the other patch.
                    Selection indicates the width of the fitness function (smaller values = stronger selection). Mutation indicates the rate per locus, per generation.
                    Recombination indicates the rate between adjacent loci on a chromosome, per generation.
                </Description>
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
    height: 100vh;
    border-width: 2px;
    border-radius: 0.30rem;
    border-style: solid;
    border-color: ${props => props.theme.chartCardOutline};
    background-color: ${props => props.theme.paramCardBackground};
    @media (min-width: 640px) {
        grid-column: span 12 / span 12;
    }
    @media (min-width: 1280px) {
        grid-column: span 3 / span 3;
    }
`

const Description = styled.p`
    color: ${props => props.theme.paramDescriptionColor};
    font-size: ${props => props.isStatic ? '1rem' : '0.75rem'};
    padding: 2rem;
`