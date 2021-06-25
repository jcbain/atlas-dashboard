import { useState } from "react";
import FileUpload from './FileUpload';
import DataTable from './Table';

function Setup() {
    const [ step, setStep ] = useState(1);

    const changeStep = (step) => {
        setStep(step);
    }

    return (
        <div>
            { step===1 ?
                <FileUpload changeStep={changeStep}/> :
                <DataTable changeStep={changeStep}/>
            }
        </div>
    )
}

export default Setup;