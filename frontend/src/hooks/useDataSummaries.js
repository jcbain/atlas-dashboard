import { useEffect, useState } from 'react';
import { min, max, uniq } from 'lodash';

const defaultAxes = {
    maxX:0,
    maxY:0,
    minX:0,
    minY:0
}

function useDataSummaries(chartData, selection, addBrush) {
    const [ axes, setAxes ] = useState(defaultAxes);
    const [ uniqVals, setUniqVals] = useState({
        x:[],
        y:[]
    });


    useEffect(()=> {
        if(addBrush || !selection || !chartData || !(selection && selection.length > 0)) {
            return;
        }

        let prevMin = axes.minX;
        let prevMax = axes.maxX;

        if((selection[1] !== prevMax || selection[0] !== prevMin)) {
            setAxes(axes=>({
                ...axes,
                maxX: selection[1],
                minX: selection[0]
            }));
        }
    }, [selection, chartData]);

    useEffect(()=> {
        if(chartData) {
            const xs = chartData.map(d => d.x);
            const ys = chartData.map(d => d.y);

            setUniqVals({
                x:uniq(xs),
                y:uniq(ys)
            })
            
            setAxes({
                maxX: max(xs),
                maxY: max(ys),
                minX: min(xs),
                minY: min(ys)
            });
        }
    }, [chartData]);


    return [axes, uniqVals]
}


export { useDataSummaries }