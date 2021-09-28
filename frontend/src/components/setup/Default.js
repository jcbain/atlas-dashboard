import React from "react";
import styled from "styled-components";
import * as Style from "../../styles/SetupStyles.styles";

const Default = ({ nextStep, defaultStep }) => {
	return (
		<section>
			{" "}
			<StepZeroWrapper>
				<Style.SetupTitle>Default or Upload</Style.SetupTitle>
				<DataContainer>
					<SubTitle> Use default data </SubTitle>

					<p>
						{" "}
						Continue to the data visualizer with the default data
						and variables set.{" "}
					</p>

					<DefaultButton type="button" onClick={defaultStep}>
						{" "}
						Continue to datavis{" "}
					</DefaultButton>
				</DataContainer>
				<DataContainer>
					<SubTitle> Upload files </SubTitle>

					<p>
						{" "}
						Upload your own csv file / slim and parameters file and
						select the variables to be visualized.
					</p>

					<UploadButton type="button" onClick={nextStep}>
						{" "}
						Continue to upload{" "}
					</UploadButton>
				</DataContainer>
			</StepZeroWrapper>
		</section>
	);
};

export default Default;

const StepZeroWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const DataContainer = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid ${(props) => props.theme.chartCardOutline};
	background-color: ${(props) => props.theme.chartCardBackground};
	border-radius: 1rem;
	padding: 3rem;
	margin: 1rem;
	max-width: 30rem;
`;

const SubTitle = styled.h4`
	text-align: center;
	text-decoration: underline;
	margin-bottom: 1rem;
`;

const DefaultButton = styled.button`
	border: none;
	background-color: #f0ad4e;
	padding: 0.5rem;
	color: white;
`;

const UploadButton = styled.button`
	border: none;
	background-color: #169cb1;
	padding: 0.5rem;
	color: white;
`;
