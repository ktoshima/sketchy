import { useEffect, useState } from "react"
import { useTimer } from "../hooks/useTimer"
import { useSessionContext } from "../hooks/useSessionContext"

import pauseIcon from '../../../assets/images/pause.svg';
import playIcon from '../../../assets/images/play.svg';

const Timer = ({ queuePos, countTime }) => {

	const {
		isFinished,
		setIsFinished
	} = useSessionContext();

	const [timeRemaining, setTimeRemaining] = useState(countTime);
	const [isRunning, setIsRunning] = useState(false);

	// restart timer on queuePos change
	useEffect(() => {
		setTimeRemaining(countTime);
	}, [countTime, queuePos])

	useTimer(
		timeRemaining,
		setTimeRemaining,
		isRunning,
		setIsRunning,
		isFinished,
		setIsFinished
	);

	const toggleRunning = () => {
		setIsRunning(flag => !flag)
	}

	return (
		<>
			<div id="timer" className={"flex-initial" + (queuePos !== 0 && Math.floor(timeRemaining/60)===0 && timeRemaining%60<=5 ? " red" : "")}>
					{ String(Math.floor(timeRemaining/60)).padStart(2, '0') }:{ String(timeRemaining%60).padStart(2, '0') }
			</div>
			<div className="flex-auto"></div>
			<div className="flex-initial">
				<button id="play-toggle" className="player-btn" disabled={timeRemaining<=0} onClick={() => toggleRunning()}>
					{isRunning ?
						<img src={pauseIcon} alt="pause" /> : <img src={playIcon} alt="play" />
					}

				</button>
				</div>
		</>
	)
}

export default Timer;
