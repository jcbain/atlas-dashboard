import { useChartData, useDataSummaries } from '../../../../hooks';
import { useEffect, useState } from 'react';
import PlotBars from './PlotBars';
import HistoSlider from "./HistoSlider"
import * as d3 from 'd3';

const HistogramChart = ({ state }) => {
    const isStatic = state.isStatic;
    const [ chartData ] = useChartData('histo', state);
    const [ selection, setSelection ] = useState([]);
    const [ histoData, setHistoData ] = useState();
    const [ axes ] = useDataSummaries(chartData, selection, true);
    const [ slider, setSlider ] = useState();

    useEffect(() => {
        if (chartData) {
            const filtered = chartData.filter(d=>d.x===slider);
            const colors = filtered.map(d => d.color);
            const nBins = 10;
            const binner = d3.bin().thresholds(nBins);

            setHistoData(binner(colors));
        }
    }, [chartData, slider]);

    return (
        <div className={`h-100 p-3 border rounded ${ isStatic ? 'col-md-9' : 'col-md-12'}`}>
            { histoData && <PlotBars
                chartData={histoData}
                selection={selection}
                setSelection={setSelection}
            /> }

            <HistoSlider 
                max={axes.maxX}
                min={axes.minX}
                slider={slider}
                setSlider={setSlider}
            />
        </div>
    )
}

export { HistogramChart };