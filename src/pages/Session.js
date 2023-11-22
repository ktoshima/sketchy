import { useEffect, useRef, useState } from "react";

import { useSessionContext } from "../hooks/useSessionContext";

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
	const [imgUrl, setImgUrl] = useState(null);
	const [countTime, setCountTime] = useState(null);

	useEffect(() => {
		if (isFinished) {
			queuePos.current = queuePos.current + 1
			if (queuePos.current === queue.length) {
				// TODO: last stage, display final screen?
				console.log('last page');
			} else if (Number.isInteger(queue[queuePos.current])) {
				// queue[queuePos] is id for image
				console.log('sketching');
				setImgUrl(gallery[queue[queuePos.current]]);
				setCountTime(sketchTime);
				setIsFinished(false);
			} else {
				// queue[queuePos] is null, thus interval
				console.log('interval');
				setImgUrl(null);
				setCountTime(interval);
				setIsFinished(false);
			}
		} else if (queuePos.current === 0) {
			setImgUrl(null);
			setCountTime(5);
			setIsFinished(false);
		}
	}, [isFinished, setIsFinished, sketchTime, interval, setCountTime, gallery, queue])


	return (
		<>
			<div>gallery: {imgUrl ? JSON.stringify(imgUrl) : "" }</div>
			<Timer countTime={countTime}  />
		</>
	)
};

export default Session;
