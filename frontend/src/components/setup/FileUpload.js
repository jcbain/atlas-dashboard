import React, { useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap'
import styled from 'styled-components';
import * as Style from "../../styles/SetupStyles.styles";

var FormData = require('form-data')

function FileUpload({ mutation }) {
  	const [ invalidFile, setInvalidFile ] = useState(false);
	const [ files, setFiles ] = useState({
		'slimFile':'',
		'jobsFile':'',
		'dataFile':''
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		Object.keys(files).forEach(key => {
			formData.append(key, files[key])
		});
		
		mutation.mutate(formData);
	}

	const validateFile = (e) => {
		let type = e.target.accept
		let validExt = new RegExp(`${type}`, 'i')
		let file = e.target.files[0]

		if (!validExt.exec(file.name)) {
			alert(`File needs to be ${type}`);
			setInvalidFile(false);
		} else {
			setFiles(oldFile => ({
				...oldFile,
				[e.target.id]:file
			}));
			setInvalidFile(true);
		}
	}

	return (
		<UploadDataWrapper onSubmit={onSubmit}>
			<Style.SetupTitle> Upload Data </Style.SetupTitle>
			<Accordion>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							Upload scripts
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							<label className="font-weight-bold">Slim script</label>
							<input
								type="file"
								className="form-control-file"
								id="slimFile"
								accept=".slim"
								onChange={validateFile}
							/>

							<label className="font-weight-bold mt-3">Parameters file</label>
							<input
								type="file"
								className="form-control-file" 
								id="jobsFile"
								accept=".txt"
								onChange={validateFile}
							/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>

				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="1">
							Upload data
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
							<label className="font-weight-bold">Data</label>
							<input
								type="file"
								className="form-control-file"
								id="dataFile"
								accept=".csv"
								onChange={validateFile}
							/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>

			<Style.StyledInputButton
				type="submit"
				value="Upload"
				disabled={!invalidFile}/>
		</UploadDataWrapper>
	)
}

export default FileUpload;

const UploadDataWrapper = styled.form`
    border: 1px solid ${props => props.theme.chartCardOutline};
    background-color: ${props => props.theme.chartCardBackground};
    border-radius: 1rem;
    padding: 2rem;
`