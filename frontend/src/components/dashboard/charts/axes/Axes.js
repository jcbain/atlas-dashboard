import { useResizeObserver } from '../../../../hooks';
import { XAxis, YAxis } from '.';
import { useEffect, useState } from 'react';
import Brush from '../brush/Brush';

const margin = 40
const font = 18

const Axes = ({ axes, addBrush }) => {
    const [ ref, observedEntry ] = useResizeObserver();
    const [ dimensions, setDimension ] = useState({
        width:0,
        height:0
    });

    useEffect(() => {
        if(observedEntry.target) {
            const { target } = observedEntry;
            setDimension({
                width: target.clientWidth,
                height: target.clientHeight-font
            });
        }
    }, [observedEntry]);

    return (
        <div ref={ref} style={{ height:"100%"}}>
            <svg width="100%" height="100%">
                <YAxis
                    margin={margin}
                    axes={axes}
                    dimensions={dimensions}
                />
                
                <XAxis
                    margin={margin}
                    axes={axes}
                    dimensions={dimensions}
                />

                { addBrush && <Brush dimensions={dimensions} margin={margin}/>}
            </svg>
        </div>
    )
}

export { Axes }