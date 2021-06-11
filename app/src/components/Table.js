import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import React, { useState } from 'react';
import Select from 'react-select'
var Axios = require('axios')

export default function DataTable() {
	const [dataVars, setDataVars] = useState([])
    const [paramVars, setParamVars] = useState([])

    const handleClick = async () => {
        try {
            var parameters = await Axios.post('/columns', {table: 'param_variables'});
            setParamVars(parameters.data.map(e => ({value: e.column_name, label: e.column_name})));

			var output = await Axios.post('/columns', {table: 'data'});
            setDataVars(output.data.map( e => ({value: e.column_name, label: e.column_name})));
		} catch (err) {
			if(err.response.status === 500) {
				console.log('Server problem');
			} else {
				console.log(err.response.data.msg);
			}
		}
    };

    return(
        <div className="row">
            { paramVars.map((e, index) => {
                return (
                    <Select
                        className="select-menu"
                        defaultValue={paramVars[index]}
                        options={dataVars}
                    />
                );
            })}

            <input className="button mt-3" type="submit" onClick={handleClick} value="Visualize data"/>
        </div>
    )
}