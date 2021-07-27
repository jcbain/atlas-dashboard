import { useEffect, useState } from 'react';
import { useChartData } from '../../../../hooks';
import PlotLine from './PlotLine';

const LineChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData ] = useChartData('line', state);
    const [ selection, setSelection ] = useState();
    // const [ childData, setChildData ] = useState();

    // useEffect(() => {
    //     if(chartData) {
    //         setChildData(chartData);
    //         if(selection) {
    //             let childD = chartData.filter(d => (d.x <=selection[1] && d.x >=selection[0]))
    //             setChildData(childD)
    //         }
    //     }
    // }, [selection, chartData])
    return (
        <div className={`p-3 border rounded ${ isStatic ? 'col-md-9' : 'col-md-12'}`}>
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