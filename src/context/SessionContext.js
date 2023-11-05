import { createContext, useState, useReducer } from "react";

export const SessionContext = createContext();

export const imageListReducer = ( state, action ) => {
	switch ( action.type ) {
		case 'SET_IMAGELIST':
			return {
				image_list: action.payload
			};
		case 'DELETE_IMAGE':
			return {
				image_list: state.image_list.filter((image) => image.id !== action.payload.id)
			};
		default:
			return state;
	}
};

export const SessionContextProvider = ({ children }) => {
	const [state, imageListDispatch] = useReducer(imageListReducer, {
		image_list: null
	});
	const [sketchNum, setSketchNum] = useState(10);
	const [sketchTime, setSketchTime] = useState(30);
	const [interval, setInterval] = useState(10);
	return (
		<SessionContext.Provider
			value={
				{
					...state, imageListDispatch,
					sketchNum, setSketchNum,
					sketchTime, setSketchTime,
					interval, setInterval
				}
			}>
			{ children }
		</SessionContext.Provider>
	)
}
