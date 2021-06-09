import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import FileUpload from './components/FileUpload'
import DataTable from './components/Table'

function App() {
	return (
		<div className="container">
			{/* <div className="row"> */}
				{/* <div className="col-3"> */}
					<FileUpload/>
				{/* </div> */}
{/* 
				<div className="col-8">
					<DataTable/>
				</div>
			</div> */}
		</div>
	);
}

export default App;
