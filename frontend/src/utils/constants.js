const SelectObject = (label, value) => ({
    label: label,
    value: value
});

const PostObject = (path, params) => ({
    path: path,
    params: params
});

const ReduxObject = (name, value, tab) => ({
    name: name,
    value: value,
    tab: tab
});

export {
    SelectObject,
    PostObject,
    ReduxObject
}