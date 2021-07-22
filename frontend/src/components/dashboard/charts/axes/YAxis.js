import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

const YAxis = ({axes, dimensions, margin}) => {
    const ref = useRef(null);

    useEffect(() => {
		const yScale = d3.scaleLinear()
			.domain([axes.minY, axes.maxY])
			.range([dimensions.height, margin])

		const svgElement = d3.select(ref.current);
		const axisGenerator = d3.axisLeft(yScale);

		svgElement.selectAll("*").remove();

		svgElement.append("g")
			.call(axisGenerator);

    }, [axes, dimensions]);

    return (
		<g
			transform={`translate(${margin}, 0)`}
			ref={ref}
		/>
    )
}

export { YAxis }