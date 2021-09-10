import { useState, useEffect } from 'react';
import { fetch } from '../utils'
import { useQuery } from "react-query"

const getChartData = (parameters) => {
    if (parameters && parameters.length > 0) {
        let query = parameters.map((e) => (`${e.label}=${e.value}`));
        let statement = query.join(' AND ');
        return fetch('/dashboard/data', statement);
    }
}

function useChartData (paramType, state) {
    const [ chartData, setChartData ] = useState([]);
    const isStatic = state.isStatic;
    const paramKey = isStatic ? paramType : 'global'
    const parameters = state[paramKey];

    const {
        data,
        status,
        refetch } = useQuery(paramType, () => getChartData(parameters));
    
    useEffect(()=> {
        refetch();
    }, [state]);

    useEffect(()=> {
        if(data) {
            setChartData(data);
        }

    }, [data]);

    return [
        chartData,
        status
    ]
}

export { useChartData };