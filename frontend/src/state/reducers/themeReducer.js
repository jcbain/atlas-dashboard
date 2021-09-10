import { lightTheme } from "../../themes/LightTheme.theme";
import { SWITCH_THEME } from "../actions/actions";

const initialState = {
	theme: lightTheme
}

const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SWITCH_THEME:
			return { theme: action.theme }

		default:
			return state;
	}
}

export default themeReducer;