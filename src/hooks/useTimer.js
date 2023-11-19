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
		if (!counterID && isRunning) {
			counterID = setInterval(() => {
				setTimeRemaining(t => t-1);
			}, 1000);
			console.log("initiating", counterID);
		}
		return () => {
			console.log("terminating", counterID);
			if (counterID) {
				clearInterval(counterID);
				counterID = null;
			};
		}
	}, [isRunning]);

	useEffect(() => {
		if (!timeRemaining) {
			setIsRunning(false);
			setIsFinished(true);
		}
	}, [timeRemaining])


}
