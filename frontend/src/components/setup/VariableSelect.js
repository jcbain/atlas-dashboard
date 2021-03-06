import Select from "react-select";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import * as Style from "../../styles/SetupStyles.styles";

import { post, SelectObject, PostObject } from "../../utils";

const VariableSelect = ({ data, handleHist, backStep }) => {
	const mutation = useMutation(
		async (table) => {
			await post(PostObject("/setup/tables", table));
		},
		{
			onSuccess: () => {
				handleHist("/datavis");
			},
		}
	);

	const [variables, setVariables] = useState();
	const options = ["x", "y", "color", "ignore"].map((vars) =>
		SelectObject(vars, vars)
	);

	useEffect(() => {
		if (data) {
			setVariables(
				data.map((e) => {
					return SelectObject(e.column_name, "parameter");
				})
			);
		}
	}, [data]);

	const onNext = async () => {
		let tables = { params: [] };

		variables.forEach((v) => {
			if (v.value === "parameter") {
				tables.params.push(v.label);
			} else if (v.value !== "ignore") {
				tables[v.value] = v.label;
			}
		});

		sessionStorage.setItem("visuals", JSON.stringify(tables));
		mutation.mutate(tables);
	};

	const onSelect = (e, index) => {
		let n = [...variables];
		n[index].value = e.label;
		setVariables(n);
	};

	return (
		<VariableSelectContainer>
			<Style.SetupTitle> Variables </Style.SetupTitle>
			<VariableSelectWrapper>
				{!mutation.isLoading &&
					variables &&
					variables.map((e, index) => {
						return (
							<LabelStyle>
								{e.label}

								<SelectStyle
									placeholder={e.value}
									options={options}
									onChange={(event) => {
										onSelect(event, index);
									}}
								/>
							</LabelStyle>
						);
					})}

				{mutation.isLoading && (
					<div class="spinner-border" role="status">
						<span class="sr-only">Uploading file(s)...</span>
					</div>
				)}
			</VariableSelectWrapper>

			<Style.StyledInputButton
				type="button"
				value="Back"
				onClick={backStep}
			/>
			<Style.StyledInputButton
				type="submit"
				onClick={onNext}
				value="Query"
			/>
		</VariableSelectContainer>
	);
};

export default VariableSelect;

const VariableSelectContainer = styled.section`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	gap: 1rem;
	min-width: 768px;
	align-items: center;
	justify-items: center;
	border: 1px solid ${(props) => props.theme.chartCardOutline};
	background-color: ${(props) => props.theme.chartCardBackground};
	border-radius: 1rem;
	padding: 2rem;
`;

const VariableSelectWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
`;

const LabelStyle = styled.label`
	text-align: center;
`;

const SelectStyle = styled(Select)`
	width: 10rem;
`;
