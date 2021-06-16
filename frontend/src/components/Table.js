import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
import Select from 'react-select'
var Axios = require('axios')

const defaultObject = (name) => ({
    label: name,
    value: name
});

const options = ["x", "y", "color", "parameter", "other"].map(vars => (defaultObject(vars)));

export default function DataTable() {
	const [variables, setVariables] = useState([]);

    const handleClick = async () => {
        try {
            var raw_param = await Axios.post('/columns', {table: 'raw_data'});
            setVariables(raw_param.data.map(e => (defaultObject(e.column_name))));
            
		} catch (err) {
			if(err.response.status === 500) {
				console.log('Server problem');
			} else {
				console.log(err.response.data.msg);
			}
		}
    };

    const onAlterTable = async() => {
        try {
            var cols = {
                params:[],
                visuals:{}
            };
    
            variables.map(vars => {
                if (vars.value === 'parameter') {
                    cols.params.push(vars.label)
                } else if (vars.value !== "other") {
                    cols.visuals[vars.value]=vars.label
                }
            });

            await Axios.post('/parameters', cols);
		} catch (err) {
            console.log(err.response.data.msg);
		}
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
                                onChange={event => {
                                    [...variables][index].value = event.value
                                    setVariables([...variables])
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <input className="button mt-3" type="submit" onClick={handleClick} value="Visualize data"/>
            <input className="button mt-3" type="submit" onClick={onAlterTable} value="Next"/>
        </div>
    )
}