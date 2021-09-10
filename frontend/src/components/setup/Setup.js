import { useQuery, useMutation } from "react-query"
import { useHistory, useLocation } from 'react-router-dom';

import FileUpload from './FileUpload';
import VariableSelect from './VariableSelect';
import { fetch, post, PostObject } from '../../utils'
import styled from "styled-components";
import * as Style from "../../styles/SetupStyles.styles";
import ProgressBar from "./progressbar/ProgressBar";

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
        <>
            { step===0 &&
                <StepZeroWrapper>
                    <Style.SetupTitle>Default or Upload</Style.SetupTitle>
                    <DataContainer>
                        <SubTitle> Use default data </SubTitle>
                        
                        <p> Continue to the data visualizer with the default
                            data and variables set. </p>

                        <DefaultButton
                            type="button"
                            onClick={() => {
                                refetch();
                                handleHist('/setup?step=2')
                            }}
                        > Continue to datavis </DefaultButton>
                    </DataContainer>
                    <DataContainer>
                        <SubTitle> Upload files </SubTitle>

                        <p> Upload your own csv file / slim and parameters
                            file and select the variables to be visualized.</p>

                        <UploadButton
                            type="button"
                            onClick={()=>{handleHist('/setup?step=1')}}
                        > Continue to upload </UploadButton>
                    </DataContainer>
                </StepZeroWrapper>
            }

            { step===1 && !mutation.isLoading && <FileUpload mutation={mutation} /> }
            
            { step===1 && mutation.isLoading && 
                <ProgressBar/>
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
        </>
    )
}

export default Setup;

const StepZeroWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.chartCardOutline};
    background-color: ${props => props.theme.chartCardBackground};
    border-radius: 1rem;
    padding: 3rem;
    margin: 1rem;
    max-width: 30rem;
`

const SubTitle = styled.h4`
    text-align: center;
    text-decoration: underline;
    margin-bottom: 1rem;
`

const DefaultButton = styled.button`
    border: none;
    background-color: #F0AD4E;
    padding: 0.5rem;
    color: white;
`

const UploadButton = styled.button`
    border: none;
    background-color: #169CB1;
    padding: 0.5rem;
    color: white;
`