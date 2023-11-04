import { useState } from "react";

const InputForm = () => {
	const [slideNum, setSlideNum] = useState(0);
	const [minute, setMinute] = useState(3);
	const [second, setSecond] = useState(0);
	const [intervalSecond, setIntervalSecond] = useState(0);
	const [emptyFields, setEmptyFields] = useState([]);
	const [error, setError] = useState(null);

	const handleSubmit = () => {};


	return (
		<form action="" className="query-form" onSubmit={handleSubmit}>
			<h3>Set number of slides</h3>
			<input
				type="number"
				step="1"
				min="1"
				onChange={(e) => setSlideNum(e.target.value)}
				value={slideNum}
				className={emptyFields.includes('sqlQuery' ? 'error' : '')}
			/>
			<h3>Set drawing time</h3>
			<input
				type="number"
				step="1"
				min="0"
				onChange={(e) => setMinute(e.target.value)}
				value={minute}
				className={emptyFields.includes('columnMap' ? 'error' : '')}
			/>
			<label htmlFor="">m</label>
			<input
				type="number"
				step="1"
				min="0"
				onChange={(e) => setSecond(e.target.value)}
				value={second}
				className={emptyFields.includes('columnMap' ? 'error' : '')}
			/>
			<label htmlFor="">s</label>
			<h3>Set interval</h3>
			<input
				type="number"
				step="1"
				min="1"
				onChange={(e) => setIntervalSecond(e.target.value)}
				value={intervalSecond}
				className={emptyFields.includes('columnMap' ? 'error' : '')}
			/>

			<button>Start</button>
			{ error && <div className="error"> { error } </div> }
		</form>
	)

}

export default InputForm;
