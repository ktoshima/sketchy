import { useEffect } from "react"


export const useTimer = (
	sketchTime,
	interval,
	timeRemaining,
	setTimeRemaining,
	isRunning,
	setIsRunning,
	isFinished,
	setIsFinished
) => {
	let counterID;
	useEffect(() => {
		if (isRunning) {
			counterID = setInterval(() => {
				setTimeRemaining(t => t-1);
			}, 1000);
		}
		return () => {
			if (counterID) clearInterval(counterID);
		}
	}, [isRunning]);

	useEffect(() => {
		if (!timeRemaining) {
			setIsFinished(true);
			setIsRunning(false);
		}
	}, [timeRemaining])


}
