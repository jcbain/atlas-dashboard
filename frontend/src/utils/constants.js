const SelectObject = (label, value) => ({
	label: label,
	value: value,
});

const BaseSelectObject = (label, value, choice) => ({
	label: label,
	value: value,
	link: choice,
});

const MultiSelectObject = (label, value) => ({
	label: label,
	value: value,
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

export {
	SelectObject,
	BaseSelectObject,
	MultiSelectObject,
	PostObject,
	ReduxObject,
};
