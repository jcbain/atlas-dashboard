import { useEffect, useState } from 'react';
import { useChartData, useDataSummaries } from '../../../../hooks';
import PlotGenome from './PlotGenome';
import styled from 'styled-components';
import Legend from './Legend';

const GenomeChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData ] = useChartData('genome', state);
    const [ axes, uniqVals ] = useDataSummaries(chartData);
    const [ selection, setSelection ] = useState();
    
    console.log(axes);
    return (
        <GenomeChartWrapper isStatic={isStatic}>
            <LegendWrapper>
               <Legend title={'locus effect size'} minVal={axes.minY} maxVal={axes.maxY} /> 
            </LegendWrapper>
            <PlotGenome
                addBrush={false}
                chartData={chartData}
                selection={selection}
                setSelection={setSelection}
            />
            
            <PlotGenome
                addBrush={true}
                chartData={chartData}
                selection={selection}
                setSelection={setSelection}
            />
        </GenomeChartWrapper> 
    )
}

export { GenomeChart };

const GenomeChartWrapper = styled.div`
    padding: 0.75rem 0.75rem 8rem 0.75rem;
    border-width: 1px;
    border-radius: 0.25rem;
    grid-column: span 2 / span 2;
    grid-row: ${props => props.isStatic ? 'span 2 /span 2' : 'span 1 / span 1'};
`

const LegendWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`