import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ja from './locales/ja.json';

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		// set English default language
		fallbackLng: 'en',
		returnEmptyString: false,
		resources: {
			en: {
				translation: en
			},
			ja: {
				translation: ja
			}
		},
		// not needed for react as it escapes by default
		interpolation: {
			escapeValue: false
		},
		react: {
			transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'span']
		},
		// detect language from browser's language
		detection: {
			order: ['navigator'],
		},
	});

export default i18n;
