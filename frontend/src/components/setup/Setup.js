import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import FileUpload from "./FileUpload";
import VariableSelect from "./VariableSelect";
import { fetch, post, PostObject } from "../../utils";
import ProgressBar from "./progressbar/ProgressBar";
import Default from "./Default";

const Setup = () => {
	const history = useHistory();
	const [step, setStep] = useState(0);
	const nextStep = () => {
		setStep((cur) => cur + 1);
	};
	const backStep = () => {
		setStep((cur) => cur - 1);
	};

	const handleHist = (route) => {
		history.push(route);
	};

	const { data, refetch } = useQuery("variables", () =>
		fetch("/setup/variables")
	);

	const mutation = useMutation(
		async (formData) => {
			await post(PostObject("/setup/upload", formData));
		},
		{
			onSuccess: () => {
				// If file uploading and descartes is successful, refetch variables
				refetch();
			},
		}
	);

	return (
		<>
			{step === 0 && <Default nextStep={nextStep} />}
			{step === 1 && !mutation.isLoading && (
				<FileUpload
					mutation={mutation}
					nextStep={nextStep}
					backStep={backStep}
				/>
			)}
			{step === 1 && mutation.isLoading && <ProgressBar />}

			{step === 2 &&
				(data && data.length > 0 ? (
					<VariableSelect
						handleHist={handleHist}
						data={data}
						backStep={backStep}
					/>
				) : (
					<h1>generating data...</h1>
				))}
		</>
	);
};

export default Setup;
