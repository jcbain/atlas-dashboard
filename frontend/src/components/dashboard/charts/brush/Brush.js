import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { usePrevious } from '../../../../hooks';

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

const Brush = ({ xScale, dimensions, margin, selection, setSelection }) => {
    const ref = useRef(null);
    const svgElement = d3.select(ref.current);
    const previousSelection = usePrevious(selection);

    useEffect(()=> {
        const brush = d3.brushX()
                        .extent([
                            [margin, margin],
                            [dimensions.width-margin, dimensions.height]])
                        .on("start brush end", brushed)

        if(previousSelection === selection) {
            svgElement
                .call(brush)
                .call(brush.move, [margin, dimensions.width-margin]);
        }
    }, [dimensions, previousSelection])

    function brushed(event) {
        if(event.selection) {
            const index = event.selection.map(xScale.invert);
            setSelection(index)
        }
    }

    return (
		<StyledG ref={ref}/>
    )
}


export default Brush;