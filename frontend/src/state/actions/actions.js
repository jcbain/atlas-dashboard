export const SWITCH_THEME = "SWITCH_THEME"

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

export const switchTheme = (theme) => {
    return (dispatch) => {
        dispatch({
            type: SWITCH_THEME,
            theme: theme,
        })
    }
}