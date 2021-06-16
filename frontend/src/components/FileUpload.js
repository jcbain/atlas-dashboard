import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, Button } from 'react-bootstrap'

var FormData = require('form-data')
var Axios = require('axios')

export default function FileUpload() {
  	const [invalidFile, setInvalidFile] = useState(false);
	const [files, setFiles] = useState({
		'slimFile':'',
		'jobsFile':'',
		'dataFile':''
	})

	const onSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();

		Object.keys(files).forEach(key => {
			formData.append(key, files[key])
		});

		try {
			await Axios.post('/upload', formData);
		} catch (err) {
			if(err.response.status === 500) {
				console.log('Server problem');
			} else {
				console.log(err.response.data.msg);
			}
		}
	}

	const validateFile = (e) => {
		let type = e.target.accept
		let validExt = new RegExp(`${type}`, 'i')
		let file = e.target.files[0]

		if (!validExt.exec(file.name)) {
			alert(`File needs to be ${type}`)
			setInvalidFile(false)
		} else {
			setFiles(oldFile => ({
				...oldFile,
				[e.target.id]:file
			}))
			setInvalidFile(true)
		}
	}

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
		</form>
	)
}