import { useEffect, useState } from 'react';
import { useChartData } from '../../../../hooks';
import PlotGenome from './PlotGenome';
import styled from 'styled-components';

const GenomeChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData ] = useChartData('genome', state);
    const [ selection, setSelection ] = useState();
    
    return (
        <GenomeChartWrapper isStatic={isStatic}>
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
    padding: 0.75rem 0.75rem 1.25rem 0.75rem;
    border-width: 1px;
    border-radius: 0.25rem;
    grid-column: span 2 / span 2;
    grid-row: ${props => props.isStatic ? 'span 2 /span 2' : 'span 1 / span 1'};
`