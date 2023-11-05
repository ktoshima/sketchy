import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import context
import { useSessionContext } from "../hooks/useSessionContext";


const InputForm = () => {
	const { sketchNum, setSketchNum, sketchTime, setSketchTime, interval, setInterval } = useSessionContext();

	const [minute, setMinute] = useState();
	const [second, setSecond] = useState(sketchTime);
	const [emptyFields, setEmptyFields] = useState([]);
	const [error, setError] = useState([]);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		// check empty/invalid fields
		let emptyFieldList = []
		let errorStatements = []
		if (!sketchNum) {
			emptyFieldList.push('sketchNum');
			errorStatements.push('Number of Sketch has to be greater than 0');
		}
		if (!minute && !second) {
			emptyFieldList.push('sketchTime');
			errorStatements.push('Sketch Time should be longer than 0s');
		}
		if (emptyFieldList.length) {
			setEmptyFields(emptyFieldList);
			setError(errorStatements);
		} else {
			setEmptyFields([]);
			setError([]);
			setSketchTime(60 * (minute ? minute : 0) + (second ? second : 0));
			navigate("/session")
		}
	};


	return (
		<form action="" className="query-form" onSubmit={handleSubmit}>
			<h3>Set Number of Sketch</h3>
			<input
				type="number"
				step="1"
				min="1"
				onChange={(e) => setSketchNum(e.target.value)}
				value={sketchNum}
				className={emptyFields.includes('sketchNum') ? 'error' : ''}
			/>
			<h3>Set Sketch Time</h3>
			<input
				type="number"
				step="1"
				min="0"
				onChange={(e) => setMinute(e.target.value)}
				value={minute}
				className={emptyFields.includes('sketchTime') ? 'error' : ''}
			/>
			<label htmlFor="">m</label>
			<input
				type="number"
				step="1"
				min="0"
				onChange={(e) => setSecond(e.target.value)}
				value={second}
				className={emptyFields.includes('sketchTime') ? 'error' : ''}
			/>
			<label htmlFor="">s</label>
			<h3>Set interval</h3>
			<input
				type="number"
				step="1"
				min="1"
				onChange={(e) => setInterval(e.target.value)}
				value={interval}
				className={emptyFields.includes('interval') ? 'error' : ''}
			/>
			<label htmlFor="">s</label>

			<button>Start</button>
			{ Boolean(error.length) && error.map((e) =>(<div className="error"> { e } </div>)) }
		</form>
	)

}

export default InputForm;
