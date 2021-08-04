import { fetch, SelectObject } from '../utils'
import { useQuery } from "react-query"
import { useState, useEffect } from 'react';

function useParameters(state, paramName, activeTab) {
    const { data } = useQuery('parameters', () => fetch('/dashboard/parameters'));
    const [ parameters, setParameters ]  = useState(); //Array of objects [{label:value},{label:value}...]

    useEffect(() => {
        //If sessionStorage already has defaultSet, set parameters.
        if (data && data.length > 0) { 
            let keys = Object.keys(data[0]).splice(1);
            let options = {}
            let paramSet =[]
    
            keys.map((e) => {
                const temp = []
                data.map((col) => {
                    if(!temp.includes(col[e])) {
                        temp.push(col[e])
                    }
                });

                paramSet.push(SelectObject(e, data[0][e]));
                options[e] = temp.map(a => (SelectObject(a, a)))
            });

            sessionStorage.setItem('options', JSON.stringify(options));
            sessionStorage.setItem('defaultSet', JSON.stringify(paramSet));
            setParameters(paramSet);
        }
    }, [data]);

    return{ parameters, setParameters }
}

export { useParameters }