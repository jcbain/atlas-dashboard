import { useChartData, useDataSummaries } from '../../../../hooks';
// import { Axes } from '../axes';
// import { useState } from 'react';

const HistogramChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData, status ] = useChartData('histo', state);
    const [ axes ] = useDataSummaries(chartData, status);
    // const [ selection, setSelection ] = useState([]);

    return (
        axes &&
            <div className={`p-3 border rounded ${ isStatic ? 'col-md-9' : 'col-md-12'}`}>
                <h1> histogram </h1>
                {/* <Axes 
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
                /> */}

            </div> 
    )
}

export { HistogramChart };