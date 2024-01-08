import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";

// import context
import { useSessionContext } from "../hooks/useSessionContext";

const SessionSettings = () => {
	const {
		gallery, galleryDispatch,
		queueDispatch,
		imageQuery, setImageQuery,
		sketchNum, setSketchNum,
		sketchTime, setSketchTime,
		interval, setInterval
	} = useSessionContext();

	const [minute, setMinute] = useState();
	const [second, setSecond] = useState(sketchTime);
	const [emptyFields, setEmptyFields] = useState([]);
	const [shuffleQueue, setShuffleQueue] = useState(true);
	const [error, setError] = useState([]);
	const navigate = useNavigate();

	// request gallery when initialized
	useEffect(() => {
		const requestGallery = () => {
			browser.runtime.sendMessage({
				type: "request_gallery"
			}).then((res) => {
				setImageQuery(res.image_query);
				galleryDispatch({type: 'SET_GALLERY', payload: res.gallery});
			})
		}
		requestGallery();
	}, [galleryDispatch, setImageQuery]);

	const handleStartSession = () => {

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
			if (shuffleQueue) {
				queueDispatch({type: 'SHUFFLE', interval: Boolean(interval), length: Object.keys(gallery).length})
			} else {
				queueDispatch({type: 'ORDERED', interval: Boolean(interval), length: Object.keys(gallery).length})
			}
			navigate("/session");
		}
	};

	const sketchNumInput = useId();
	const sketchTimeMinInput = useId();
	const sketchTimeSecInput = useId();
	const intervalInput = useId();
	const shuffleButton = useId();

	return (
		<div id="session-settings">
			<h1>Session Settings</h1>
			<div id="session-info">
				<div className="session-info_row">
					<div className="session-info_row_title">Image Query</div>
					<div className="session-info_row_item">{imageQuery}</div>
				</div>
				<div className="session-info_row">
					<div className="session-info_row_title">Gallery Length</div>
					<div className="session-info_row_item">{gallery ? gallery.length : 0}</div>
				</div>
			</div>
			<hr />
			<div id="session-form">
				<label className="input-title" htmlFor={sketchNumInput}>Set Number of Sketch</label>
				<div className="input-form">
					<input
						id={sketchNumInput}
						type="number"
						step="1"
						min="1"
						onChange={(e) => setSketchNum(Number(e.target.value))}
						value={sketchNum}
						className={emptyFields.includes('sketchNum') ? 'error' : ''}
					/>
					<label className="sublabel"></label>
				</div>
				<label className="input-title" htmlFor={sketchTimeMinInput}>Set Sketch Time</label>
				<div className="input-form">
					<input
						id={sketchTimeMinInput}
						type="number"
						step="1"
						min="0"
						onChange={(e) => setMinute(Number(e.target.value))}
						value={minute}
						className={emptyFields.includes('sketchTime') ? 'error' : ''}
					/>
					<label className="sublabel" htmlFor={sketchTimeMinInput}>m</label>
					<input
						id={sketchTimeSecInput}
						type="number"
						step="1"
						min="0"
						onChange={(e) => setSecond(Number(e.target.value))}
						value={second}
						className={emptyFields.includes('sketchTime') ? 'error' : ''}
					/>
					<label className="sublabel" htmlFor={sketchTimeSecInput}>s</label>
				</div>
				<label className="input-title" htmlFor={intervalInput}>Set interval</label>
				<div className="input-form">
					<input
						id={intervalInput}
						type="number"
						step="1"
						min="0"
						onChange={(e) => setInterval(Number(e.target.value))}
						value={interval}
						className={emptyFields.includes('interval') ? 'error' : ''}
					/>
					<label className="sublabel" htmlFor={intervalInput}>s</label>
				</div>
				<div className="switch-row">
					<div className="switch">
						<label className="toggle" htmlFor={shuffleButton}>
							<input
								id={shuffleButton}
								type="checkbox"
								defaultChecked={shuffleQueue}
								onChange={(e) => setShuffleQueue(e.target.checked)}
							/>
							<span className="slider"></span>
						</label>
					</div>
					<label className="switch-label" htmlFor={shuffleButton}>Shuffle Images</label>
				</div>
			</div>
			<button onClick={() => handleStartSession()}>START SESSION</button>
			{ Boolean(error.length) && error.map((e) =>(<div className="error"> { e } </div>)) }
		</div>
	)

}

export default SessionSettings;
