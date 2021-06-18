import api from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import Select from 'react-select'

const defaultObject = (name) => ({
    label: name,
    value: name
});

const options = ["x", "y", "color", "parameter"].map(vars => (defaultObject(vars)));

export default function DataTable() {
	const [ variables, setVariables ] = useState([]);
    const [ tables, setTables ] = useState({
        params:[],
        visuals:{}
    });

    useEffect(() => {
        async function fetchColumns() {
            let res = await api.post({
                path: '/columns',
                params: {
                    table: 'raw_data',
                    select: 'column_name',
                    from: 'information_schema.columns'
                }
            });
            setVariables(res.data.map ((e) => (defaultObject(e.column_name))));
        }
        fetchColumns();
    });

    const onSelect = (e, vars) => {
        if (e.value === 'parameter') {
            tables.params.push(vars)
        } else {
            tables.visuals[e.value]=vars
        }
        setTables({...tables})
    }
    
    const onNext = async() => {
        await api.post({
            path:'/parameters',
            params: tables
        });
    };
    
    return (
        <div className="border rounded p-5 mb-5">
            <h3 className="text-center mb-5">Variables</h3>
            <div className="mt-5 row">
                { variables.map((e, index) => {
                    return (
                        <div className="col-6 row">
                            <label className="col-4">
                                {e.label}
                            </label>

                            <Select
                                className="mb-3 col-6"
                                defaultValue={variables[index]}
                                options={options}
                                onChange={(event) => {
                                    onSelect(event, [...variables][index].label)
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <input className="button mt-3" type="submit" onClick={onNext} value="Next"/>
        </div>
    )
}