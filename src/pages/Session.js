import { useSessionContext } from "../hooks/useSessionContext";


const Session = () => {
	const { gallery, sketchNum, sketchTime, interval } = useSessionContext();




	return (
		<>
			<div>gallery: { JSON.stringify(gallery) }</div>
			<div>sketchNum: { sketchNum }</div>
			<div>sketchTime: { sketchTime }</div>
			<div>interval: { interval }</div>
		</>
	)
};

export default Session;
