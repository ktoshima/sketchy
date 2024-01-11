import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		fallbackLng: 'en', // set English default language
		returnEmptyString: false,
		resources: {
			en: {
				translation: require('./en.json')
			},
			ja: {
				translation: require('./ja.json')
			}
		},
		interpolation: {
			escapeValue: false
		},
		react: {
			transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'span']
		}
	});

export default i18n;
