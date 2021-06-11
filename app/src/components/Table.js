import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
var Axios = require('axios')

const visual_vars = ['x-axis', 'y-axis', 'color']

const defaultObject = (name) => ({
    value: name,
    label: name
})

export default function DataTable() {
	const [dataVars, setDataVars] = useState([])
    const [paramVars, setParamVars] = useState([])
    const [visualVars, setVisualVars] = useState(visual_vars.map(vars => (defaultObject(vars))))
    const [parameters, setParameters] = useState([])

    useEffect(() => {
        console.log("Parameters: ", parameters)
        console.log("Visual variables: ", visualVars)
    }, [parameters, visualVars]);

    const handleClick = async () => {
        try {
            var raw_param = await Axios.post('/columns', {table: 'param_variables'});
			var output = await Axios.post('/columns', {table: 'output_data'});

            setParamVars(raw_param.data.map(e => (defaultObject(e.column_name))));
            setDataVars(output.data.map( e => (defaultObject(e.column_name))));
		} catch (err) {
			if(err.response.status === 500) {
				console.log('Server problem');
			} else {
				console.log(err.response.data.msg);
			}
		}
    };

    const handleParameters = (e, value) => {
        const isChecked = e.target.checked

        if (isChecked) {
            setParameters(parameters=>[...parameters, value])
        } else {
            setParameters(parameters.filter(item => item !== value))
        }
    };

    return (
        <div>
            <div className="border rounded p-5 mb-5">
                <h3 className="text-center mb-5">Parameters</h3>
                <form className="row justify-content-center">
                    { dataVars.map((e) => {
                        return (
                                <label className="col-4">     
                                    <input
                                        style={{width: '20px', height: '20px'}}
                                        className="mr-2"
                                        type="checkbox"
                                        onChange={event => {handleParameters(event, e)}}
                                    />
                                    {e.label}
                                </label>
                        );
                    })}
                </form>

                <div className="mt-5 row justify-content-center">
                    { parameters.map((e, index) => {
                        return (
                            <label className="text-center col-4">
                                {e.label}
                                <Select
                                    className="mb-3"
                                    defaultValue={parameters[index]}
                                    options={paramVars}
                                    onChange={event => {
                                        [...parameters][index].value = event.value
                                        setParameters([...parameters])
                                    }}
                                />
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className="border rounded p-5">
                <h3 className="text-center mb-5">Chart axes</h3>
                { visualVars.map((e, index) => {
                    return (
                        <label className="text-center col-4">
                            {e.label}
                            <Select
                                className="mb-3"
                                defaultValue={visualVars[index]}
                                options={dataVars}
                                onChange={event => {
                                    [...visualVars][index].value = event.value
                                    setVisualVars([...visualVars])
                                }}
                            />
                        </label>
                    );
                })}
            </div>

            <input className="button mt-3" type="submit" onClick={handleClick} value="Visualize data"/>
        </div>
    )
}