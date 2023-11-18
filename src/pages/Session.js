import { useSessionContext } from "../hooks/useSessionContext";


import Timer from '../components/Timer';


const Session = () => {
	const { gallery, sketchNum, sketchTime, interval } = useSessionContext();




	return (
		<>
			<div>gallery: { JSON.stringify(gallery) }</div>
			<div>sketchNum: { sketchNum }</div>
			<div>sketchTime: { sketchTime }</div>
			<div>interval: { interval }</div>
			<Timer />
		</>
	)
};

export default Session;
