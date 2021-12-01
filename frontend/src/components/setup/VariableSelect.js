import Select from "react-select";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import * as Style from "../../styles/SetupStyles.styles";

import {
	post,
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
	const [selectState, setSelectState] = useState(() =>
		["x", "y", "color", "parameter"].map((item) => null)
	);

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
		const clonedSelectState = JSON.parse(JSON.stringify(selectState));
		clonedSelectState[index] = e;

		if (index !== 3) {
			v[index].value.push(e.value);
		} else {
			const flattenedValue = [].concat.apply([], [e]);
			const unique = [...new Set(flattenedValue.map((val) => val.value))];
			v[index].value = unique;
		}

		setSelectState(clonedSelectState);
		setChosenVariables(v);
	};

	return (
		<VariableSelectContainer>
			<Style.SetupTitle> Variables </Style.SetupTitle>
			<VariableSelectWrapper>
				{!mutation.isLoading &&
					variables &&
					selectState.map((variable, index) => {
						const options = getOptionsToRender(
							selectState,
							variables
						);

						return (
							<LabelStyle>
								{chosenVariables[index].label}

								<SelectStyle
									key={index}
									isMulti={
										chosenVariables[index].label ===
										"parameter"
											? true
											: false
									}
									closeMenuOnSelect={
										chosenVariables[index].label ===
										"parameter"
											? false
											: true
									}
									value={selectState[index]}
									placeholder={chosenVariables[index].label}
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

const getOptionsToRender = (allSelectedOptions, variables) => {
	const filteredOptions = allSelectedOptions.flatMap((options) => options);

	const optionsToRender =
		filteredOptions.length > 0
			? variables.filter(
					(option) =>
						!filteredOptions.some(
							(selectOption) =>
								option &&
								selectOption &&
								option.value === selectOption.value
						)
			  )
			: variables;
	return optionsToRender;
};

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
