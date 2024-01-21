import { useTranslation } from 'react-i18next';

const Viewer = ({ viewObject }) => {

	const { t, i18n } = useTranslation();

	return (
		<div id="viewer">
			{viewObject && viewObject.type === 'interval' &&
				<div id="viewer-message">
					{t("session.viewer_message."+viewObject.message)}
				</div>
			}
			{viewObject && viewObject.type === 'drawing' &&
				<>
					{/* <div> Drawing #{viewObject.drawingNum}/{viewObject.outof} </div> */}
					<div id="viewer-image">
						<img src={viewObject.img.imgurl} alt={viewObject.img.imgurl}/>
					</div>
				</>
			}
		</div>
	)
}

export default Viewer;
