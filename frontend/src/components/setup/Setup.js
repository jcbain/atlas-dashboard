import { useQuery, useMutation } from "react-query"
import { useHistory, useLocation } from 'react-router-dom';

import FileUpload from './FileUpload';
import VariableSelect from './VariableSelect';
import { fetch, post, PostObject } from '../../utils'

const Setup = () => {
    const history = useHistory();
    let step = 1;

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

    // fetch variables for variables selector in step 2
    const { data, refetch } = useQuery('variables', () =>
            fetch('/setup/variables')
        );

    const mutation = useMutation(async(formData) => {
            handleHist('/setup?step=2');
            await post(PostObject('/setup/upload', formData));
        },{
            onSuccess: () => { // If file uploading and descartes is successful, refetch variables
                refetch();
            }
        }
    );

    return (
        <div className="container">
            { step===1 ? 
                <FileUpload mutation={mutation} />
                :
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