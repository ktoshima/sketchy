import { useEffect, useState } from "react"
import { useTimer } from "../hooks/useTimer"
import { useSessionContext } from "../hooks/useSessionContext"

const Timer = ({ countTime }) => {

	const {
		isFinished,
		setIsFinished
	} = useSessionContext();

	const [timeRemaining, setTimeRemaining] = useState(countTime);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		console.log('remaining time set at %d', countTime);
		setTimeRemaining(countTime);
	}, [countTime])

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
			<div>{ String(Math.floor(timeRemaining/60)).padStart(2, '0') }:{ String(timeRemaining%60).padStart(2, '0') }</div>
			<button disabled={timeRemaining<=0} onClick={() => toggleRunning()}>{isRunning ? 'pause' : 'start'}</button>
		</>
	)
}

export default Timer;
