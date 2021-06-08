import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card, Button } from 'react-bootstrap'

var FormData = require('form-data')
var Axios = require('axios')

export default function FileUpload() {
	const [slimFile, setSlimFile] = useState('')
	const [jobsFile, setJobsFile] = useState('')
	const [dataFile, setDataFile] = useState('')

	useEffect(() => {
		saveFile();

		async function saveFile() {
			const formData = new FormData();

			formData.append("slimFile", slimFile)
			formData.append("jobsFile", jobsFile)
			formData.append("dataFile", dataFile)
	
			try {
				await Axios.post('/upload', formData);
	
			} catch (err) {
				if(err.response.status === 500) {
					console.log('Server problem');
				} else {
					console.log("Waiting for file upload.");
				}
			}
		}
	}, [slimFile, jobsFile, dataFile]);

	const onSubmit = async e => {
		e.preventDefault();

		try {
			await Axios.post('/output');
		} catch (err) {
			if(err.response.status === 500) {
				console.log('Server problem');
			} else {
				console.log(err.response.data.msg);
			}
		}
	}

	return(
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
							<input type="file" className="form-control-file" onChange={event => {setSlimFile(event.target.files[0])}}/>

							<label className="font-weight-bold mt-3" htmlFor="jobsFile">Parameters file</label>
							<input type="file" className="form-control-file" onChange={event => {setJobsFile(event.target.files[0])}}/>
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
							<input type="file" className="form-control-file" onChange={event => {setDataFile(event.target.files[0])}}/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
			
			<input className="button mt-3 mr-3" type="submit" value="Generate data"/>
		</form>
	)
}