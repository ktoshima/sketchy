import { useSessionContext } from "../hooks/useSessionContext";


const Session = () => {
	const { sketchNum, sketchTime, interval } = useSessionContext;




	return (
		<div>Canvas</div>
	)
};

export default Session;
