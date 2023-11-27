import { useEffect, useRef, useState } from "react";

import { useSessionContext } from "../hooks/useSessionContext";

import Viewer from "../components/Viewer";
import Timer from '../components/Timer';


const Session = () => {
	const {
		gallery,
		queue,
		isFinished, setIsFinished,
		sketchNum,
		sketchTime,
		interval
	} = useSessionContext();
	const queuePos = useRef(0);
	const currentSketchNum = useRef(0);
	const isSkipped = useRef(false);
	const [viewObject, setViewObject] = useState(null);
	const [countTime, setCountTime] = useState(null);

	useEffect(() => {
		if (isFinished) {
			if (queue[queuePos.current] && !isSkipped.current) {
				currentSketchNum.current += 1;
			} else {
				isSkipped.current = false;
			}
			queuePos.current = queuePos.current + 1;
			if (currentSketchNum.current === sketchNum || queuePos.current === queue.length) {
				// TODO: last stage, display final screen?
				setViewObject({type: 'interval', message: 'Finished! You can close this tab.'})
				setCountTime(null);
				setIsFinished(true);
			} else if (Number.isInteger(queue[queuePos.current])) {
				// queue[queuePos] is id for image
				setViewObject({type: 'drawing', drawingNum: currentSketchNum.current+1, img: gallery[queue[queuePos.current]]});
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
	// gallery, queue, sketchNum, sketchTime, and interval will not change
	// setIsFinished and setCountTime are useState function that will not change
	// they're in the dependencies list to avoid eslint warnings
	}, [isFinished, setIsFinished, sketchNum, sketchTime, interval, setCountTime, gallery, queue])

	const skip = () => {
		if (queue[queuePos.current]) {
			isSkipped.current = true;
		}
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
