import { XAxis, YAxis } from '.';
import Brush from '../brush/Brush';
import * as d3 from 'd3';

const margin = 40;

const Axes = ({ axes, dimensions, addBrush, selection, setSelection }) => {
    const xScale = d3.scaleLinear()
        .domain([axes.minX, axes.maxX])
        .range([margin, dimensions.width-margin]);

    const yScale = d3.scaleLinear()
        .domain([axes.minY, axes.maxY])
        .range([dimensions.height, margin]);

    return (
        <svg width="100%" height="100%" style={{position: 'relative'}} className="border border-info">
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

    )
}

export { Axes }