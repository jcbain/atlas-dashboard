import { useChartData, useAxesData } from '../../../../hooks';
import { Axes } from '../axes';

const HistogramChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData, status ] = useChartData('histo', state);
    const [ axes ] = useAxesData(chartData, status);
    
    return (
        axes &&
            <div className={`border rounded ${ isStatic ? 'col-md-9' : 'col-md-12'}`}>
                <div className="p-3" style={{ height:"65%"}}>
                    <Axes 
                        addBrush={false}
                        axes={axes}
                    />
                </div> 
            
                <div className="p-3" style={{ height:"35%"}}>
                    <Axes
                        addBrush={true}
                        axes={axes}
                    />
                </div>
            </div> 
    )
}

export { HistogramChart };