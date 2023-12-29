import AlertIcon from '../../../assets/images/url_alert.svg';

const UrlAlert = () => (
	<div className="url-alert">
		<img src={AlertIcon} alt="" />
		<div>Sketchy is not compatible with current URL</div>
	</div>
);

export default UrlAlert;
