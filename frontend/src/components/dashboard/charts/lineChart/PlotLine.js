import { Axes } from '../axes';
import { useResizeObserver, useDataSummaries } from '../../../../hooks';
import { useRef, useEffect, useState } from 'react';
import { meanBy } from 'lodash';
import * as d3 from 'd3';

const margin=40;

const PlotLine = ({ addBrush, chartData, selection, setSelection }) => {
    const [ ref, observedEntry, dimensions ] = useResizeObserver();
    const canvasRef = useRef(null);
    const [ axes, uniqVals ] = useDataSummaries(chartData, selection, addBrush);


    function drawLine (xScale, yScale, context) {
        const lineData = uniqVals.x.map((x) => {
            const vals = chartData.filter(d => d.x===x)
            const averageY = meanBy(vals, (p) => p.y);
            return { x:x, y:averageY }
        });

        for ( var i=1; i < lineData.length; i++) {
            let curr = lineData[i-1];
            let next = lineData[i];
            
            context.beginPath();
            context.moveTo(xScale(curr.x), yScale(curr.y))
            context.globalAlpha = 1;
            context.lineJoin = "round";
            context.lineTo(xScale(next.x), yScale(next.y));
            context.strokeStyle = "#808080";
            context.lineWidth = 4;

            if(((next.x >= selection[0])) && (curr.x <= selection[1])) {
                context.strokeStyle = "#682CFE";
                context.lineWidth = 2;
            }

            context.stroke();
        }
    }

    useEffect(() => {
        if (chartData && selection) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            const height = dimensions.height-margin
            const width = dimensions.width-(margin*2)
    
            context.clearRect(0, 0, width, height)
    
            const xScale = d3.scaleLinear()
                            .domain([axes.minX, axes.maxX])
                            .range([0, width])
    
            const yScale = d3.scaleLinear()
                            .domain([axes.maxY, axes.minY])
                            .range([0, height])
    
            drawLine (xScale, yScale, context);
        }
    }, [dimensions, chartData, selection]);

    return (
        <div ref={ref} style={{ position:'relative', height:`${addBrush ? 35 : 65}%`}}>
            <canvas 
                ref={canvasRef}
                style={{ position:'absolute', top:`${margin}px`, left:`${margin}px`}} 
                width={`${dimensions.width-(margin*2)}px`} 
                height={`${dimensions.height-margin}px`} 
                // className="border border-info"
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


export default PlotLine;