import { useRef, useEffect } from "react"


export const useTimer = (
	timeRemaining,
	setTimeRemaining,
	isRunning,
	setIsRunning,
	isFinished,
	setIsFinished
) => {
	const intervalRef = useRef(null);
	useEffect(() => {
		if (!intervalRef.current && isRunning) {
			intervalRef.current = setInterval(() => {
				setTimeRemaining(t => t-1);
			}, 1000);
		}
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			};
		};
	}, [isRunning, setTimeRemaining]);

	useEffect(() => {
		if (Number.isInteger(timeRemaining) && timeRemaining <= 0) {
			setIsRunning(false);
			setIsFinished(true);
		}
	}, [timeRemaining, setIsRunning, setIsFinished]);

	useEffect(() => {
		if (!isFinished) {
			setIsRunning(true);
		}
	}, [isFinished, setIsRunning]);


}
