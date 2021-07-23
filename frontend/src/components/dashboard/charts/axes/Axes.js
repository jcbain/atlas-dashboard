import { useResizeObserver } from '../../../../hooks';
import { XAxis, YAxis } from '.';
import { useEffect, useState } from 'react';
import Brush from '../brush/Brush';
import * as d3 from 'd3';

const margin = 40;

const Axes = ({ axes, addBrush, selection, setSelection }) => {
    const [ ref, observedEntry, dimensions ] = useResizeObserver();

    const xVals = {
        max: (selection && !addBrush) ? selection[1] : axes.maxX,
        min: (selection && !addBrush) ? selection[0] : axes.minX 
    }

    const xScale = d3.scaleLinear()
        .domain([xVals.min, xVals.max])
        .range([margin, dimensions.width-margin]);

    const yScale = d3.scaleLinear()
        .domain([axes.minY, axes.maxY])
        .range([dimensions.height, margin])

    return (
        <div ref={ref} style={{ height:`${addBrush ? 35 : 65}%`}}>
            <svg width="100%" height="100%">
                <YAxis
                    yScale={yScale}
                    margin={margin}
                />
                
                <XAxis
                    xScale={xScale}
                    dimensions={dimensions}
                />

                { addBrush && 
                    <Brush
                        xScale={xScale}
                        dimensions={dimensions}
                        margin={margin}
                        selection={selection}
                        setSelection={setSelection}
                    />
                }
            </svg>
        </div>
    )
}

export { Axes }