import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import Twig from 'twig';

export function setupI18n(app) {
    i18next
        .use(Backend)
        .use(i18nextMiddleware.LanguageDetector)
        .init({
            backend: {
                loadPath: './server/locales/{{lng}}/{{ns}}.json',
            },
            debug: false,
            detection: {
                order: ['header', 'path'],
                lookupPath: 'lng',
                lookupFromPathIndex: 0,
                caches: false
            },
            fallbackLng: 'en',
            preload: ['en', 'zh-hk']
        });
    app.use(i18nextMiddleware.handle(i18next));
}

export function setupTwig(app) {
    Twig.cache(app.get('env') === 'production');
    app.set('views', './server/views');
    app.set('view engine', 'twig');
}