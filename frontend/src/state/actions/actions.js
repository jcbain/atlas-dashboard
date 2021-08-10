export const updateTab = (name, value, tab) => {
    return (dispatch) => {
        dispatch({
            type: "update",
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const switchTab = (tab) => {
    return (dispatch) => {
        dispatch({
            type: "switch",
            payload:{
                tab: tab
            }
        })
    }
}