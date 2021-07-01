const SelectObject = (label, value) => ({
    label: label,
    value: value
});

const PostObject = (path, params) => ({
    path: path,
    params: params
});

export {
    SelectObject,
    PostObject
}