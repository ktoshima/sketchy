import { createContext, useState, useReducer } from "react";

export const SessionContext = createContext();

export const galleryReducer = ( state, action ) => {
	switch ( action.type ) {
		case 'SET_GALLERY':
			return {
				gallery: action.payload
			};
		case 'DELETE_IMAGE':
			return {
				gallery: state.gallery.filter((image) => image.id !== action.payload.id)
			};
		default:
			return state;
	}
};

export const SessionContextProvider = ({ children }) => {
	const [state, galleryDispatch] = useReducer(galleryReducer, {
		gallery: null
	});
	const [sketchNum, setSketchNum] = useState(10);
	const [sketchTime, setSketchTime] = useState(30);
	const [interval, setInterval] = useState(10);
	return (
		<SessionContext.Provider
			value={
				{
					...state, galleryDispatch,
					sketchNum, setSketchNum,
					sketchTime, setSketchTime,
					interval, setInterval
				}
			}
		>
			{ children }
		</SessionContext.Provider>
	)
}
