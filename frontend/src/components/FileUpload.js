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

//@TODO: Make into one function that takes slim, jobs, and data file validation
	const slimValidateFile = (e) => {
		let validExt = /(\.slim)$/i;
		let filename = e.target.files[0].name
		if (!validExt.exec(filename)) {
			alert("File needs to be .slim")
			setInvalidFile(false)
		} else {
			setFiles({...files, slimFile: e.target.files[0]})
		}
	}

	const jobsValidateFile = (e) => {
		let validExt = /(\.txt)$/i;
		let filename = e.target.files[0].name
		if (!validExt.exec(filename)) {
			alert("File needs to be .txt")
			setInvalidFile(false)
		} else {
			setFiles({...files, jobsFile: e.target.files[0]})
			setInvalidFile(true)
		}
	}

	const dataValidateFile = (e) => {
		let validExt = /(\.csv)$/i;
		let filename = e.target.files[0].name
		if (!validExt.exec(filename)) {
			alert("File needs to be .csv")
			setInvalidFile(false)
		} else {
			setFiles({...files, dataFile: e.target.files[0]})
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
							<input type="file" className="form-control-file" accept=".slim" onChange={slimValidateFile}/>

							<label className="font-weight-bold mt-3" htmlFor="jobsFile">Parameters file</label>
							<input type="file" className="form-control-file" accept=".txt" onChange={jobsValidateFile}/>
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
							<input type="file" className="form-control-file" accept=".csv" onChange={dataValidateFile}/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
			
			<input className="button mt-3 mr-3" type="submit" value="Upload" disabled={!invalidFile}/>
		</form>
	)
}