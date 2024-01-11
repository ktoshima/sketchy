import AlertIcon from '../../../assets/images/url_alert.svg';

const UrlAlert = ({alertText}) => (
	<div className="url-alert">
		<img src={AlertIcon} alt="" />
		<div>{ alertText }</div>
	</div>
);

export default UrlAlert;
