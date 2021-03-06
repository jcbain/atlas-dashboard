import * as d3 from 'd3';
import { useRef } from 'react';

const YAxis = ({ yScale, margin}) => {
    const ref = useRef(null);
 
	const svgElement = d3.select(ref.current);
	const axisGenerator = d3.axisLeft(yScale);

	svgElement.selectAll("*").remove();

	svgElement.append("g")
		.call(axisGenerator);

    return (
		<g
			transform={`translate(${margin}, 0)`}
			ref={ref}
		/>
    )
}

export { YAxis }