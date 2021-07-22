import { useEffect, useState } from 'react';

function useAxesData(chartData, status) {
    const [ axes, setAxes ] = useState({
        maxX:0,
        maxY:0,
        minX:0,
        minY:0
    });

    const [ uniqX, setUniqX] = useState();

    useEffect(()=> {
        if(chartData && status === "success") {
            let uniqueX = new Set(chartData.map((e) => e.x)) // Get unique xValues
            setUniqX([...uniqueX]);

            let xVals = getAxesValues('x', chartData); // Get min and max X
            let yVals = getAxesValues('y', chartData); // Get min and max Y

            setAxes({
                ...axes,
                maxX: xVals.max,
                maxY: yVals.max,
                minX: xVals.min,
                minY: yVals.min
            });
        }
    }, [chartData]);

    return [axes, uniqX]
}

function getAxesValues (elem, chartData) {
    let chartArr = chartData.map(a => a[elem]);
    let minVal = Math.min(...chartArr);
    let maxVal = Math.max(...chartArr);

    if(Number.isFinite(minVal) && Number.isFinite(maxVal)) {
        return {max:maxVal, min:minVal};
    }

    return 0;
}

export { useAxesData }