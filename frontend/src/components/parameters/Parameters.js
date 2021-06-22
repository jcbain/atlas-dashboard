import api from '../../api'
import React, { useState, useEffect } from 'react';

function Parameters() {
    const [parameters, setParameters] = useState([]);

    useEffect(() => {
        async function fetchColumns() {
            let columns = await api.get({ path: '/charts' });
            console.log(columns.data)
        }
        fetchColumns();
    });

    return (
        <div className="border rounded p-5 mb-5">
        </div>
    )
}

export default Parameters;