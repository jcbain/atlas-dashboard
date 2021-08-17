import { XAxis, YAxis } from '.';
import Brush from '../brush/Brush';
import * as d3 from 'd3';
import { TickText } from './AxisParts';

const margin = 40;

const variables = JSON.parse(sessionStorage.getItem('visuals'));

const Axes = ({ axes, dimensions, addBrush, selection, setSelection }) => {
    let yAxisLabel= <TickText
                        fontSize={17}
                        textAnchor="start"
                        transform={`translate(2, ${dimensions.height/2}) rotate(90)`}
                    >
                        { variables.y }
                    </TickText>
    
    let xAxisLabel= <TickText
                        fontSize={17}
                        textAnchor="start"
                        transform={`translate(${(dimensions.width/2)-margin}, ${dimensions.height + margin/2 + 15})`}
                    >
                        { variables.x }
                    </TickText>

    const xScale = d3.scaleLinear()
        .domain([axes.minX, axes.maxX])
        .range([margin, dimensions.width-margin]);

    const yScale = d3.scaleLinear()
        .domain([axes.minY, axes.maxY])
        .range([dimensions.height, margin]);

    return (
        <svg width="100%" height="100%" style={{ position: 'relative', overflow: 'visible' }}>
            <YAxis
                yScale={yScale}
                margin={margin}
            />
            { !addBrush && yAxisLabel }

            <XAxis
                xScale={xScale}
                dimensions={dimensions}
            />
            { addBrush && xAxisLabel}

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