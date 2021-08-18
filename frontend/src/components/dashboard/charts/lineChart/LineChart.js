import { useState } from 'react';
import { useChartData } from '../../../../hooks';
import PlotLine from './PlotLine';
import styled from 'styled-components';

const LineChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData ] = useChartData('line', state);
    const [ selection, setSelection ] = useState();
    
    return (
        <LineChartWrapper isStatic={isStatic}>
            <PlotLine
                addBrush={false}
                chartData={chartData}
                selection={selection}
                setSelection={setSelection}
            />
            
            <PlotLine
                addBrush={true}
                chartData={chartData}
                selection={selection}
                setSelection={setSelection}
            />
        </LineChartWrapper> 
    )
}

export { LineChart };

const LineChartWrapper = styled.div`
    padding: 0.75rem 0.75rem 1.25rem 0.75rem;
    border-width: 1px;
    border-radius: 0.25rem;
    grid-column: span 2 / span 2;
    grid-row: ${props => props.isStatic ? 'span 2 /span 2' : 'span 1 / span 1'};
`