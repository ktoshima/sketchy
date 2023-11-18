import { useEffect, useState } from "react"
import { useTimer } from "../hooks/useTimer"
import { useSessionContext } from "../hooks/useSessionContext"



const Timer = () => {

	const { sketchTime, interval } = useSessionContext();

	const [timeRemaining, setTimeRemaining] = useState(interval);
	const [isRunning, setIsRunning] = useState(false);
	const [isFinished, setIsFinished] = useState(false);

	useEffect(() => {
		console.log('timer rendered');
	})

	useEffect(() => {
		setTimeRemaining(sketchTime);
	}, [])

	useTimer(
		sketchTime, interval,
		timeRemaining, setTimeRemaining,
		isRunning, setIsRunning,
		isFinished, setIsFinished
	);

	const toggleRunning = () => {
		setIsRunning(flag => !flag)
	}

	return (
		<>
			<div>{ timeRemaining }</div>
			<button onClick={() => toggleRunning()}>{isRunning ? 'pause' : 'start'}</button>
		</>
	)
}

export default Timer;
