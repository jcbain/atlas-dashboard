import { useEffect, useState } from 'react';
import { useChartData } from '../../../../hooks';
import PlotGenome from './PlotGenome';

const GenomeChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData ] = useChartData('genome', state);
    const [ selection, setSelection ] = useState();
    
    return (
        <div className={`p-3 border rounded ${ isStatic ? 'col-md-9' : 'col-md-12'}`}>
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
        </div> 
    )
}

export { GenomeChart };