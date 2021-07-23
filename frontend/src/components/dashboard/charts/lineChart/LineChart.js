import { useState } from 'react';
import { useChartData, useAxesData } from '../../../../hooks';
import { Axes } from '../axes';

const LineChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData, status ] = useChartData('line', state);
    const [ axes ] = useAxesData(chartData, status);
    const [ selection, setSelection ] = useState();

    return (
        axes &&
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

export { LineChart };