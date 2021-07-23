import { useState } from 'react';
import { useChartData, useAxesData } from '../../../../hooks';
import { Axes } from '../axes';

const GenomeChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData, status ] = useChartData('genome', state);
    const [ axes ] = useAxesData(chartData, status);
    const [ selection, setSelection ] = useState();

    return (
        <div className={`p-3 border rounded ${ isStatic ? 'col-md-9' : 'col-md-12'}`}>
            <Axes 
                addBrush={false}
                axes={axes}
                selection={selection}
                setSelection={setSelection}
            />

            <Axes
                addBrush={true}
                axes={axes}
                selection={selection}
                setSelection={setSelection}
            />
        </div> 
    )
}

export { GenomeChart };