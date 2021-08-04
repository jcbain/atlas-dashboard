import { Axes } from '../axes';
import { useDataSummaries, useResizeObserver } from '../../../../hooks';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const margin=40;

const PlotGenome = ({ addBrush, chartData, selection, setSelection }) => {
    const [ ref, observedEntry, dimensions ] = useResizeObserver();
    const [ axes, uniqVals ] = useDataSummaries(chartData, selection, addBrush);
    const canvasRef = useRef(null);
    const colorScale = colorScaleCreator(axes.minY, axes.maxY);

    useEffect(() => {
        if (chartData && selection) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const height = dimensions.height-margin;
            const width = dimensions.width-(margin*2);

            context.clearRect(0, 0, width, height);

            const uniqX = addBrush ? uniqVals.x : uniqVals.x.filter(x => (x <=selection[1] && x>=selection[0]))
            const xBand = d3.scaleBand().domain(uniqX).range([0, width]);
            const yBand = d3.scaleBand().domain(uniqVals.y).range([0, height]);
            
            chartData.forEach((v) => {
                context.fillStyle = "#e0e0e0";

                if(v.x >= selection[0] && v.x <= selection[1]) {
                    context.fillStyle = colorScale(v.color);
                }
                
                context.fillRect(xBand(v.x), yBand(v.y), xBand.bandwidth(), yBand.bandwidth());
            });
        }

      }, [dimensions, chartData, selection]);

    return (
        <div ref={ref} style={{ position:'relative', height:`${addBrush ? 35 : 65}%`}}>
            <canvas 
                ref={canvasRef}
                style={{ position:'absolute', top:`${margin}px`, left:`${margin}px`}} 
                width={`${dimensions.width-(margin*2)}px`} 
                height={`${dimensions.height-margin}px`} 
                className="border border-info"
            />
            <Axes 
                addBrush={addBrush}
                axes={axes}
                dimensions={dimensions}
                selection={selection}
                setSelection={setSelection}
            />
        </div>
    )
}

function colorScaleCreator(minVal, maxVal) {
    const colorScaleUp = d3.scaleLinear()
                            .domain([0, maxVal])
                            .range(["#ffd000", "#eb4034"])
                            .interpolate(d3.interpolateHcl);

    const colorScaleDown = d3.scaleLinear()
                            .domain([minVal, 0])
                            .range(["#5d0096", "#0082e6"])
                            .interpolate(d3.interpolateHcl);

    return (i) => i === 0 ? '#5d0096': i < 0 ? colorScaleDown(i) : colorScaleUp(i);
}
export default PlotGenome;