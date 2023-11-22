import { createContext, useState, useReducer } from "react";

export const SessionContext = createContext();

export const shuffleArray = (array) => {
	let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		--currentIndex;
		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
	return array;
}

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

export const queueReducer = ( state, action ) => {
	switch ( action.type ) {
		case 'ORDERED':
			return {
				queue: Array.from(
					{length: action.payload*2},
					(_, i) => i%2===0 ? null : (i-1)/2
				)
			};
		case 'SHUFFLE':
			const idxRef = shuffleArray([...Array(action.payload).keys()])
			return {
				queue: Array.from(
					{length: action.payload*2},
					(_, i) => i%2===0 ? null : idxRef[(i-1)/2]
				)
			};
		default:
			return state;
	}
}

export const SessionContextProvider = ({ children }) => {
	const [galleryState, galleryDispatch] = useReducer(galleryReducer, {
		gallery: null
	});
	const [queueState, queueDispatch] = useReducer(queueReducer, {
		queue: null
	});
	const [isFinished, setIsFinished] = useState(false);
	const [sketchNum, setSketchNum] = useState(10);
	const [sketchTime, setSketchTime] = useState(30);
	const [interval, setInterval] = useState(10);
	return (
		<SessionContext.Provider
			value={
				{
					...galleryState, galleryDispatch,
					...queueState, queueDispatch,
					isFinished, setIsFinished,
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
