import { useEffect } from 'react';
import Dropdown from './Dropdown';
import { useParameters } from '../../../hooks';

const Parameters = ({ state, updateTab, paramName }) => {
    const { parameters, setParameters }  = useParameters(state, paramName);

    useEffect(() => {
        updateTab(paramName, parameters);
    }, [parameters]);

    return (
        <div className="border rounded p-3 col-12">
            <Dropdown
                parameters={parameters}
                setParameters={setParameters}
            />
        </div>
    );
}
export { Parameters }