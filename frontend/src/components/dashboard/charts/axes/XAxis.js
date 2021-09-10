import * as d3 from 'd3';
import { useRef } from 'react';

const XAxis = ({ xScale, dimensions }) => {
    const ref = useRef(null);
	
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