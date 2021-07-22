import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const StyledG = styled.g`
    .selection {
        stroke: none;
        fill: #d1d1d1;
    }
    .handle {
        fill: black;
        width: 4px;
    }
`

const Brush = ({dimensions, margin}) => {
    const ref = useRef(null);
    const svgElement = d3.select(ref.current);

    useEffect(()=> {
        const brush = d3.brushX().extent([
            [margin, margin],
            [dimensions.width-margin, dimensions.height]
        ]);

        svgElement.selectAll("*").remove();

        svgElement
            .call(brush)
            .call(brush.move, 
                [margin, dimensions.width-margin]
            );
    },[dimensions])

    return (
		<StyledG ref={ref}/>
    )
}


export default Brush;