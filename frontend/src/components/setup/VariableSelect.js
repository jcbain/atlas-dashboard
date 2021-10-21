import Select from "react-select";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import * as Style from "../../styles/SetupStyles.styles";

import {
	post,
	SelectObject,
	PostObject,
	BaseSelectObject,
	MultiSelectObject,
} from "../../utils";

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
	const [chosenVariables, setChosenVariables] = useState();

	useEffect(() => {
		if (data) {
			setVariables(
				data.map((e) => {
					return BaseSelectObject(
						e.column_name,
						e.column_name,
						"ignore"
					);
				})
			);
		}
		setChosenVariables(
			["x", "y", "color", "parameter"].map((v) => {
				return MultiSelectObject(v, []);
			})
		);
	}, [data]);

	const onNext = async () => {
		let tables = { params: [] };

		chosenVariables.forEach((v) => {
			if (v.label === "parameter") {
				tables.params = v.value;
			} else {
				tables[v.label] = v.value[0];
			}
		});
		console.log(JSON.stringify(tables));
		sessionStorage.setItem("visuals", JSON.stringify(tables));
		mutation.mutate(tables);
	};

	const onSelect = (e, index) => {
		let v = [...chosenVariables];

		if (index !== 3) {
			v[index].value.push(e.value);
		} else {
			const flattenedValue = [].concat.apply([], [e]);
			const unique = [...new Set(flattenedValue.map((val) => val.value))];
			v[index].value = unique;
		}
		setChosenVariables(v);
	};

	return (
		<VariableSelectContainer>
			<Style.SetupTitle> Variables </Style.SetupTitle>
			<VariableSelectWrapper>
				{!mutation.isLoading &&
					variables &&
					chosenVariables.map((e, index) => {
						const options = variables.filter(
							(v) => v.label !== e.value
						);
						return (
							<LabelStyle>
								{e.label}

								<SelectStyle
									key={index}
									isMulti={
										e.label === "parameter" ? true : false
									}
									closeMenuOnSelect={
										e.label === "parameter" ? false : true
									}
									placeholder={e.label}
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
	grid-template-columns: repeat(4, 1fr);
	gap: 2rem;
`;

const LabelStyle = styled.label`
	text-align: center;
`;

const SelectStyle = styled(Select)`
	width: 16rem;
`;
