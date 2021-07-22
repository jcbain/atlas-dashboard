import Select from 'react-select'
import { useState, useEffect } from "react";
import { useMutation } from "react-query"

import { post, SelectObject, PostObject } from '../../utils'

const VariableSelect = ({ data, handleHist }) => {
    const mutation = useMutation(async(table) => {
            await post(PostObject('/setup/tables', table));
        },{
            onSuccess: () => {
                handleHist('/datavis');
            }
        }
    );

    const [ variables, setVariables ] = useState();
    const options = ["x", "y", "color", "ignore"]
                .map(vars => SelectObject(vars, vars));

    useEffect(() => {
        if(data) {
            setVariables( data.map((e) => 
                (SelectObject(e.column_name, "parameter"))
            ));
        }
    
    }, [data]);

    
    const onNext = async() => {
        let tables = { params: [] }

        variables.forEach((v) => {
            if(v.value === "parameter") {
                tables.params.push(v.label);
            } else if (v.value !== "ignore") {
                tables[v.value]=v.label;
            }
        });

        mutation.mutate(tables);
    };
    
    const onSelect = (e, index) => {
        let n = [...variables]
        n[index].value=e.label
        setVariables(n);
    }

    return (
        <div className="border rounded p-5 mb-5">
            <h3 className="text-center mb-5"> Variables </h3>
            <div className="mt-5 row">
                { !mutation.isLoading && variables && 
                    ( variables.map((e, index) => {
                        return (
                            <div className="col-6 row">
                                <label className="col-4">
                                    {e.label}
                                </label>

                                <Select
                                    className="mb-3 col-6"
                                    placeholder={e.value}
                                    options={options}
                                    onChange={(event) => {
                                        onSelect(event, index)
                                    }}
                                />
                            </div>
                        );
                    }))
                }

                { mutation.isLoading && <h1>creating parameters...</h1> }

            </div>

            <input className="button mt-3 mr-3" type="submit" value="Back" onClick={()=>handleHist('/setup?step=1')}/>
            <input className="button mt-3" type="submit" onClick={onNext} value="Query"/>
        </div>
    )
}

export default VariableSelect;