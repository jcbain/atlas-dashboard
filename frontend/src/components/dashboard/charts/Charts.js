import { Parameters } from "../parameters";
import { GenomeChart, LineChart, HistogramChart } from '.';
import styled from "styled-components";

//Chart wrapper
const Charts = ({ state, updateTab }) => {
    const isStatic = state.isStatic;

    return (
        state && 
        <ChartsWrapper>
            <GenomeContainer>
                <ChartView isStatic={isStatic}>
                    <StaticParam>
                        { isStatic &&
                            <Parameters
                                state={state}
                                updateTab={updateTab}
                                paramName={'genome'}
                            />
                        }
                    </StaticParam>
                    <GenomeChart state={state} />
                </ChartView>
            </GenomeContainer>
            <ChartContainer>
                <ChartView isStatic={isStatic}>
                    <StaticParam>
                        { isStatic &&
                                <Parameters
                                    state={state}
                                    updateTab={updateTab}
                                    paramName={'histo'}
                                />
                        }
                    </StaticParam>
                    <HistogramChart state={state} />
                </ChartView>
            </ChartContainer>
            <ChartContainer>
                <ChartView isStatic={isStatic}>
                    <StaticParam>
                        { isStatic &&
                                <Parameters
                                    state={state}
                                    updateTab={updateTab}
                                    paramName={'line'}
                                />
                        }
                    </StaticParam>
                    <LineChart state={state} />
                </ChartView>
            </ChartContainer>
        </ChartsWrapper>
    )
}

export { Charts };

const ChartsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 1.5rem;
`

const ChartContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-column: 1 / -1;
    border-width: ${props => props.isStatic ? '0px' : '2px'};
    border-radius: 0.30rem;
    border-style: solid;
    border-color: ${props => props.theme.chartCardOutline};
    background-color: ${props => props.theme.chartCardBackground};
    @media (min-width: 1280px) {
        grid-column: span 6 / span 6;
    }
`

const ChartView = styled.div`
    display: grid;
    grid-template-rows: ${props => props.isStatic ? '15% 1fr' : 'repeat(1, minmax(0, 1fr))'};
`

const GenomeContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-column: 1 / -1;
    border-width: ${props => props.isStatic ? '0px' : '2px'};
    border-radius: 0.30rem;
    border-style: solid;
    border-color: ${props => props.theme.chartCardOutline};
    background-color: ${props => props.theme.chartCardBackground};
`

const StaticParam = styled.div`
    grid-column: span 2 / span 2;
`