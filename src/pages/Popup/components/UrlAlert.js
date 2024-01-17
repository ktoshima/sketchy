import AlertIcon from '../../../assets/images/url_alert.svg';

const UrlAlert = ({alertText, currentLang}) => (
	<div className="url-alert">
		<img src={AlertIcon} alt="" />
		<div><span lang={currentLang}>{ alertText }</span></div>
	</div>
);

export default UrlAlert;
