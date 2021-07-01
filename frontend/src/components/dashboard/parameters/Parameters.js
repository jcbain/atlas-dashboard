import ParameterSelector from './ParameterSelector';
import api from '../../../api'
import { useQuery } from "react-query"
import { useState, useEffect } from 'react';
import { SelectObject } from "../../Constants";

function Parameters({parameters, setParameters}) {
    const { data, status } = useQuery('parameters', () => api.fetch('/dashboard/parameters'));
    const [ options, setOptions] = useState({});

    useEffect(() => {
        if(data && data.length > 0) {
            let keys = Object.keys(data[0]).splice(1);

            keys.map((e) => {
                setParameters(params => [...params, SelectObject(e, data[0][e])])
            });
    
            keys.map((e) => {
                const arr = []
                data.map((col) => {
                    if(!arr.includes(col[e])) {
                        arr.push(col[e])
                    }
                });
                options[e] = arr.map(a => (SelectObject(a, a)))
                setOptions(options)
            });
        }
    }, [data]);

    return (
        <div className="col-12 border rounded p-3 d-flex justify-content-center">
            { status==="success" ?
                < ParameterSelector
                    parameters={parameters}
                    setParameters={setParameters}
                    options={options}
                />:
                <h1>Loading...</h1>
            }
        </div>
    )
}

export default Parameters;