import { useEffect, useState } from 'react';
import { min, max, uniq } from 'lodash';

function useDataSummaries(chartData, selection, addBrush) {
    const [ axes, setAxes ] = useState({
        maxX:0,
        maxY:0,
        minX:0,
        minY:0,
        minColor:0,
        maxColor:0
    });

    const [ uniqVals, setUniqVals] = useState({
        x:[],
        y:[]
    });

    // Update x values when brush is moved
    useEffect(() => {
        if(!addBrush && (selection && selection.length > 0)) {
            if((selection[1] !== axes.maxX || selection[0] !== axes.minX)) {
                const data = chartData.filter((d) => (d.x <=selection[1] && d.x >= selection[0]));
                updateX(data);
            }
        }
    }, [selection]);

    useEffect(()=> {
        if(chartData && chartData.length > 0) {
            updateX(chartData);
            updateConstants(chartData);
        }
    }, [chartData]);
    
    function updateX(data) {
        const xs = data.map(d => d.x);

        setUniqVals(uniqVals => ({
            ...uniqVals,
            x:uniq(xs).sort((a, b) => a - b),
        }));
        
        setAxes(axes => ({
            ...axes,
            maxX: max(xs),
            minX: min(xs),
        }));
    }

    function updateConstants(data) {
        const ys = data.map(d => d.y);
        const color = data.map(d => d.color);

        setUniqVals(uniqVals => ({ 
            ...uniqVals,
            y:uniq(ys).sort((a, b) => a - b)
        }));
        
        setAxes(axes => ({
            ...axes,
            maxY: max(ys),
            minY: min(ys),
            minColor: min(color),
            maxColor: max(color)
        }));
    }

    return [axes, uniqVals]
}


export { useDataSummaries }