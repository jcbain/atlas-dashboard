import { useQuery, useMutation } from "react-query"
import { useHistory, useLocation } from 'react-router-dom';

import FileUpload from './FileUpload';
import VariableSelect from './VariableSelect';
import { fetch, post, PostObject } from '../../utils'

const Setup = () => {
    const history = useHistory();
    let step = 0;

	try {
		const location = useLocation();
		let p = location.search;
		step = parseInt((p.split('step=')[1]));
	} catch (err) {
		console.log(err);
	}

    const handleHist = (route) => {
        history.push(route);
    };

    const { data, refetch } = useQuery('variables', () =>
            fetch('/setup/variables')
        );

    const mutation = useMutation(async(formData) => {
            await post(PostObject('/setup/upload', formData))
        },{
            onSuccess: () => { // If file uploading and descartes is successful, refetch variables
                refetch();
                handleHist('/setup?step=2');
            }
        }
    );

    return (
        <div className="container">
            { step===0 &&
                <div className="row text-center">
                    <div className="col-md-5 m-2 border rounded p-5">
                        <h5> Use default data </h5>
                        
                        <p> Continue to the data visualizer with the default
                            data and variables set. </p>

                        <button
                            type="button"
                            className="btn btn-warning float-end"
                            onClick={() => {
                                refetch();
                                handleHist('/setup?step=2')
                            }}
                        > Continue to datavis </button>
                    </div>

                    <div className="col-md-5 m-2 border rounded p-5">
                        <h5> Upload files </h5>

                        <p> Upload your own csv file / slim and parameters
                            file and select the variables to be visualized.</p>

                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={()=>{handleHist('/setup?step=1')}}
                        > Continue to upload </button>
                    </div>
                </div>
            }

            { step===1 && !mutation.isLoading && <FileUpload mutation={mutation} /> }
            
            { step===1 && mutation.isLoading && 
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            }    

            { step===2 &&
                ( (data && data.length > 0) ?
                    <VariableSelect
                        handleHist={handleHist}
                        data={data}
                    />
                    :
                    <h1>generating data...</h1>
                )
            }
        </div>
    )
}

export default Setup;