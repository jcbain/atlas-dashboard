import api from '../../api'
import React, { useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

var FormData = require('form-data')

export function FileUpload() {
	let history = useHistory();
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

		await api.post({
			path: '/upload',
			params: formData
		});
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

	const handleNext = () => {history.push('/setup?step=2')};

	return (
		<form onSubmit={onSubmit}>
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
			
			<input className="button mt-3 mr-3" type="submit" value="Upload" disabled={!invalidFile}/>
			<input className="button mt-3 mr-3" type="submit" value="Next" onClick={handleNext} />
		</form>
	)
}