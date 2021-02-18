
const REFRESH_CONTENT = 'REFRESH_CONTENT';

let initialState = {
	currentContent: "/main"
};

const contentReducer = (state = initialState, action) => {
	switch (action.type) {
		case REFRESH_CONTENT: {
			let stateCopy = {...state};
			stateCopy.currentContent = action.content;
			return stateCopy;
		}
		default:
			return state;
	}
}

export let refreshContent = (content) => ({
  type: REFRESH_CONTENT,
  content: content
});

export default contentReducer;