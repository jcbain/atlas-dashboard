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
                <GenomeChart state={state} />

                <div className="col-md-3">
                    { isStatic &&
                        <Parameters
                            state={state}
                            updateTab={updateTab}
                            paramName={'genome'}
                        />
                    }
                </div>
            </GenomeContainer>
            <HistoContainer>
                <HistogramChart state={state} />

                { isStatic &&
                    <div className="col-md-3">
                        <Parameters
                            state={state}
                            updateTab={updateTab}
                            paramName={'histo'}
                        />
                    </div>
                }
            </HistoContainer>

            <LineContainer>
                <LineChart state={state} />

                { isStatic &&
                    <div className="col-md-3">
                        <Parameters
                            state={state}
                            updateTab={updateTab}
                            paramName={'line'}
                        />
                    </div>
                }
            </LineContainer>


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
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
`
const GenomeContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-column: 1 / -1;
    @media (min-width: 1280px) {
        grid-column: span 12 / span 12;
    }
`
const HistoContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 1 / -1;

    @media (min-width: 640px) {
        grid-column: span 12 / span 12;
    }

    @media (min-width: 1280px) {
        grid-column: span 6 / span 6;
    }
`
const LineContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 1 / -1;

    @media (min-width: 640px) {
        grid-column: span 12 / span 12;
    }

    @media (min-width: 1280px) {
        grid-column: span 6 / span 6;
    }
`