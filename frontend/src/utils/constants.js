const SelectObject = (label, value) => ({
	label: label,
	value: value,
});

const BaseSelectObject = (label, value, parameters) => ({
	label: label,
	value: value,
	parameters: [parameters],
});

const PostObject = (path, params) => ({
	path: path,
	params: params,
});

const ReduxObject = (name, value, tab) => ({
	name: name,
	value: value,
	tab: tab,
});

export { SelectObject, BaseSelectObject, PostObject, ReduxObject };
