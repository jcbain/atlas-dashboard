import api from '../../api'
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import { useHistory } from 'react-router-dom';

const defaultObject = (name) => ({
    label: name,
    value: name
});

const options = ["x", "y", "color", "parameter"].map(vars => (defaultObject(vars)));

export function DataTable() {
    let history = useHistory();
    
	const [ variables, setVariables ] = useState([]);
    const [ tables, setTables ] = useState({
        params:[],
        visuals:{}
    });

    useEffect(() => {
        async function fetchColumns() {
            let res = await api.get({path: '/variables'});
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
        setTables({ ...tables });
    }
    
    const handleNext = () => {history.push('/datavis')};
    const handleBack = () => {history.push('/setup?step=1')};
    
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

            <input className="button mt-3" type="submit" value="Back" onClick={handleBack}/>
            <input className="button mt-3" type="submit" value="Next" onClick={handleNext}/>
            
        </div>
    )
}