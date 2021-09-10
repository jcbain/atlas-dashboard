import { useChartData, useDataSummaries } from '../../../../hooks';
import { useEffect, useState } from 'react';
import PlotBars from './PlotBars';
import HistoSlider from "./HistoSlider"
import * as d3 from 'd3';
import styled from 'styled-components';

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
        <HistoChartWrapper isStatic={isStatic}>
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
        </HistoChartWrapper>
    )
}

export { HistogramChart };

const HistoChartWrapper = styled.div`
    padding: 0.75rem 0.75rem 2rem 0.75rem;
    border-width: 1px;
    border-radius: 0.25rem;
    grid-column: span 2 / span 2;
    grid-row: ${props => props.isStatic ? 'span 2 /span 2' : 'span 1 / span 1'};
`