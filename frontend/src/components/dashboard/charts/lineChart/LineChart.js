import { useState } from 'react';
import { useChartData } from '../../../../hooks';
import PlotLine from './PlotLine';

const LineChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData ] = useChartData('line', state);
    const [ selection, setSelection ] = useState();
    
    return (
        <div className={`h-100 p-3 pb-5 border rounded ${ isStatic ? 'col-md-9' : 'col-md-12'}`}>
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
        </div> 
    )
}

export { LineChart };