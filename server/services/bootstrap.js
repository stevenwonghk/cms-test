import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import Twig from 'twig';

export function setupI18n(app) {
    i18next
        .use(Backend)
        .init({
            backend: {
                loadPath: './server/locales/{{lng}}/{{ns}}.json',
            },
            debug: process.env.I18NEXT_DEBUG || false,
            fallbackLng: 'en',
            preload: ['en', 'zh-HK']
        });
    app.use(i18nextMiddleware.handle(i18next));
}

export function setupTwig(app) {
    Twig.cache(app.get('env') === 'production');
    const settings = {
        'views': './server/views',
        'view engine': 'twig'
    };
    Object.keys(settings).forEach((key) => {
        app.set(key, settings[key]);
    });
}
