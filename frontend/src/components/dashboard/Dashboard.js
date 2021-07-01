import Parameters from "./parameters/Parameters";
import Charts from "./charts/Charts";
import { useState, useEffect } from "react";

const Dashboard = () => {
    const [ parameters, setParameters] = useState([]);
    const [ query, setQuery ] = useState("");

    useEffect(() => {
        if(parameters) {
            let arr = parameters.map((e) => (`${e.label}=${e.value}`))
            setQuery(arr.join(' AND '));
        }
    }, [parameters]);

    return (
        <div className="row">
            { query &&
                <div className="col-md-10">
                    <Charts query={query}/>
                </div>
            }
            <div className="col-md-2">
                <Parameters
                    parameters={parameters}
                    setParameters={setParameters} />
            </div>
        </div>
    )
}

export default Dashboard;