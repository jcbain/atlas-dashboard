import React, { useEffect } from 'react';
import { Slider, withStyles } from '@material-ui/core';

const PrettoSlider = withStyles({
    root: {
         color: '#e0e0e0',
    },
    thumb: {
        height: 35,
        width: 35,
        backgroundColor: '#fff',
        border: '3px solid #682CFE',
        marginTop: -8,
        marginLeft: -18,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    track: {
        height: 15,
        borderRadius: 8,
    },
    rail: {
        height: 15,
        borderRadius: 8,
    },
})(Slider);

const HistoSlider = ({max, min, slider, setSlider}) => {
    function thumb (props) {
        return(
            <span {...props}>
                <span className="text-primary">
                    {slider}
                </span>
            </span>
        )
    }

    useEffect(() => {
        setSlider(min);
    }, [min]);

    return (
        <PrettoSlider
            style={{margin: '25px', width:'90%'}}
            key={`slider-${min}`}
            defaultValue={min}
            step={10}
            max={max}
            min={min}
            onChange={(e, value)=> {setSlider(value)}}
            ThumbComponent={thumb}
        />
    );
}

export default HistoSlider;