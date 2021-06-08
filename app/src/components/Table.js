import 'bootstrap/dist/css/bootstrap.min.css'
import {Table} from 'react-bootstrap'
import React, { useState } from 'react';
var Axios = require('axios')

export default function DataTable() {
	const [data, setData] = useState()

    const handleClick = async e => {
		try {
			const res = await Axios.get('/simulation');
            setData(res.data)
		} catch (err) {
			if(err.response.status === 500) {
				console.log('Server problem');
			} else {
				console.log(err.response.data.msg);
			}
		}
	}

    return(
        <div className="row">
            <Table
                className="text-center"
                striped
                bordered
                hover
                size="lg"
            >
                <th>Output files</th>
                <tbody>
                    <tr><p>{JSON.stringify(data)}</p></tr>
                </tbody>
            </Table>

            <input className="button mt-3" type="submit" onClick={handleClick} value="Visualize data"/>
        </div>
    )
}
