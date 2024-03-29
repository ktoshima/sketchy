import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// import context
import { useSessionContext } from "../hooks/useSessionContext";

const browser = require("webextension-polyfill");

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

	// request gallery from background script when initialized
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

	const { t, i18n } = useTranslation();
	const currentLang = i18n.language;

	return (
		<div id="session-settings">
			<h1 id="session-settings-title"><span lang={currentLang}>{t("session_settings.session_settings")}</span></h1>
			<div id="session-settings-body">
				<div id="session-info">
					<div className="info-title">{t("session_settings.image_query")}</div>
					<div className="info-item">{imageQuery}</div>
					<div className="info-title">{t("common.gallery_length")}</div>
					<div className="info-item">{gallery ? gallery.length : 0}</div>
				</div>
				<hr />
				<div id="session-form">
					<label className="input-title" htmlFor={sketchNumInput}><span lang={currentLang}>
						{t("session_settings.number_of_sketch")}
					</span></label>
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
					<label className="input-title" htmlFor={sketchTimeMinInput}><span lang={currentLang}>
						{t("session_settings.sketch_time")}
					</span></label>
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
						<label className="sublabel" htmlFor={sketchTimeMinInput}><span lang={currentLang}>
							{t("session_settings.minute")}
						</span></label>
						<input
							id={sketchTimeSecInput}
							type="number"
							step="1"
							min="0"
							onChange={(e) => setSecond(Number(e.target.value))}
							value={second}
							className={emptyFields.includes('sketchTime') ? 'error' : ''}
						/>
						<label className="sublabel" htmlFor={sketchTimeSecInput}><span lang={currentLang}>
							{t("session_settings.second")}
						</span></label>
					</div>
					<label className="input-title" htmlFor={intervalInput}><span lang={currentLang}>
						{t("session_settings.interval_bw_sketch")}
					</span></label>
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
						<label className="sublabel" htmlFor={intervalInput}><span lang={currentLang}>
							{t("session_settings.second")}
						</span></label>
					</div>
					<label className="input-title switch-label" htmlFor={shuffleButton}><span lang={currentLang}>
						{t("session_settings.shuffle_images")}
					</span></label>
					<div className="switch input-form">
						<label className="toggle" htmlFor={shuffleButton}>
							<input
								id={shuffleButton}
								type="checkbox"
								defaultChecked={shuffleQueue}
								onChange={(e) => setShuffleQueue(e.target.checked)}
							/>
							<span className="slider"></span>
						</label>
						<label className="sublabel"></label>
					</div>
				</div>
			</div>
			<button
				id="session-settings-button"
				title={t("session_settings.start_session")}
				onClick={() => handleStartSession()}
			>
				<span lang={currentLang}>{t("session_settings.start_session").toUpperCase()}</span>
			</button>
			{ Boolean(error.length) && error.map((e) =>(<div className="error"> { e } </div>)) }
		</div>
	)

}

export default SessionSettings;
