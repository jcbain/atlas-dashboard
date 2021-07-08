import api from '../../../api'
import { useQuery } from "react-query"
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'

const Charts = ({ query }) => {
    const { data, status, refetch } = useQuery('visuals', () => api.fetch('/dashboard/data', query));
    const [ visuals, setVisuals] = useState([]);

    useEffect(() => {
        if(data) {
            setVisuals(data);
        }
        refetch();
    }, [data, query]);

    return (
        <div className="border rounded p-5 col-12">
            { visuals && status==="success" ?
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">x</th>
                            <th scope="col">y</th>
                            <th scope="col">color</th>
                        </tr>
                    </thead>

                    <tbody>
                        { visuals.map((e) => {
                            return (
                                <tr>
                                    <td>{e.x}</td>
                                    <td>{e.y}</td>
                                    <td>{e.color}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            :
                <h1>Loading...</h1>
            }
        </div>
    )
}

export default Charts;