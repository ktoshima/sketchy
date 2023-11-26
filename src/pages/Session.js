import { useEffect, useRef, useState } from "react";

import { useSessionContext } from "../hooks/useSessionContext";

import Viewer from "../components/Viewer";
import Timer from '../components/Timer';


const Session = () => {
	const {
		gallery,
		queue,
		isFinished, setIsFinished,
		sketchTime,
		interval
	} = useSessionContext();
	const queuePos = useRef(0);
	const [viewObject, setViewObject] = useState(null);
	const [countTime, setCountTime] = useState(null);

	useEffect(() => {
		if (isFinished) {
			queuePos.current = queuePos.current + 1
			if (queuePos.current === queue.length) {
				// TODO: last stage, display final screen?
				setViewObject({type: 'interval', message: 'Finished! You can close this tab.'})
				setCountTime(null);
				setIsFinished(true);
			} else if (Number.isInteger(queue[queuePos.current])) {
				// queue[queuePos] is id for image
				setViewObject({type: 'drawing', img: gallery[queue[queuePos.current]]});
				setCountTime(sketchTime);
				setIsFinished(false);
			} else {
				// queue[queuePos] is null, thus interval
				setViewObject({type: 'interval', message: 'interval'});
				setCountTime(interval);
				setIsFinished(false);
			}
		} else if (queuePos.current === 0) {
			setViewObject({type: 'interval', message: 'Get ready'});
			setCountTime(5);
			setIsFinished(false);
		}
	// gallery, queue, sketchTime, and interval will not change
	// setIsFinished and setCountTime are useState function that will not change
	// they're in the dependencies list to avoid eslint warnings
	}, [isFinished, setIsFinished, sketchTime, interval, setCountTime, gallery, queue])

	const skip = () => {
		setIsFinished(true);
	};

	return (
		<>
			<Viewer viewObject={viewObject} />
			{ countTime && <Timer countTime={countTime} /> }
			{ !isFinished && <button onClick={() => skip()}>Skip</button>}
		</>
	)
};

export default Session;
