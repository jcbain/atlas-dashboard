import * as d3 from 'd3';
import { useRef } from 'react';

const XAxis = ({axes, dimensions, margin}) => {
    const ref = useRef(null);

	const xScale = d3.scaleLinear()
		.domain([axes.minX, axes.maxX])
		.range([margin, dimensions.width-margin]);
	
	const svgElement = d3.select(ref.current);
	const axisGenerator = d3.axisBottom(xScale);

	svgElement.selectAll("*").remove();

	svgElement.append("g")
		.call(axisGenerator)
		
    return (
		<g 
			transform={`translate(0, ${dimensions.height})`}
			ref={ref}
		/>
    )
}

export { XAxis }