import { useChartData, useAxesData } from '../../../../hooks';
import { Axes } from '../axes';

const GenomeChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData, status ] = useChartData('genome', state);
    const [ axes, uniqX ] = useAxesData(chartData, status);

    return (
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

export { GenomeChart };