import { useEffect, useRef, useState } from "react";

import { useSessionContext } from "../hooks/useSessionContext";

import Viewer from "../components/Viewer";
import Timer from '../components/Timer';

import skipIcon from "../../../assets/images/skip.svg";


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
			}
			isSkipped.current = false;
			queuePos.current = queuePos.current + 1;
			if (currentSketchNum.current === sketchNum || queuePos.current === queue.length) {
				// last stage, display final screen
				setViewObject({
					type: 'interval', message: 'Finished! You can close this tab.'
				})
				setCountTime(null);
				setIsFinished(true);
			} else if (Number.isInteger(queue[queuePos.current])) {
				// queue[queuePos] is id for image
				setViewObject({
					type: 'drawing',
					drawingNum: currentSketchNum.current+1, outof: sketchNum,
					img: gallery[queue[queuePos.current]]
				});
				setCountTime(sketchTime);
				setIsFinished(false);
			} else {
				// queue[queuePos] is null, thus interval
				setViewObject({
					type: 'interval', message: 'interval'
				});
				setCountTime(interval);
				setIsFinished(false);
			}
		} else if (queuePos.current === 0) {
			setViewObject({
				type: 'interval', message: 'Get ready'
			});
			setCountTime(5);
			setIsFinished(false);
		}
	// observe isFinished to update viewer and timer
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
		<div id="session">
			<Viewer viewObject={viewObject} />
			<div id="player">
				{ countTime && <Timer queuePos={queuePos.current} countTime={countTime} /> }
				<div className="flex-btn-space"></div>
				{ !isFinished && <div className="flex-initial">
					<button id="skip" className="player-btn" title="Skip" onClick={() => skip()}>
						<img src={skipIcon} alt="skip" />
					</button>
				</div>}
				<div className="flex-auto"></div>
				<div className="flex-right-space flex-initial">
				{viewObject && viewObject.type === "drawing" &&
					<div id="drawing-num">
						#{viewObject.drawingNum}/{viewObject.outof}
					</div>
				}
				</div>
			</div>
		</div>
	)
};

export default Session;
