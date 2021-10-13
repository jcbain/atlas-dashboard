export const generateInitialState = (numberOfSelects) =>
	numberOfSelects.map((item) => null);

export const getOptionsToRender = (allSelectedOptions, allOptions) => {
	const filteredOptions = allSelectedOptions.flatMap((options) => options);

	const optionsToRender =
		filteredOptions.length > 0
			? allOptions.filter(
					(option) =>
						!filteredOptions.some(
							(selectOption) =>
								option &&
								selectOption &&
								option.value === selectOption.value
						)
			  )
			: allOptions;

	return optionsToRender;
};
