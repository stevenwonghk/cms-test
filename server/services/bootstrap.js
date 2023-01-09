import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import Twig from 'twig';
import { Sequelize } from 'sequelize';

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

export function setupDatabase() {
    const sequelize = new Sequelize('cms', 'cms', 'o0ocms', {
        host: 'localhost',
        dialect: 'mysql'
    });

    // // 定義一個叫做 User 的資料結構
    // const User = sequelize.define('User', {
    //     // 定義 Model 屬性
    //     firstName: {                 // 欄位名稱
    //         type: Sequelize.STRING,  //  資料型態
    //         allowNull: false         // 能不能為空，預設是 true
    //     },
    //     lastName: {
    //         type: Sequelize.STRING
    //         // allowNull defaults to true
    //     }
    // }, {
    //     // Other model options go here
    // });

    // sequelize.sync().then(() => {
    //     User.create({
    //         firstName: 'Steven',
    //         lastName: 'Wong'
    //     }).then(() => {
    //         console.log('create successfully');
    //     });
    // });
}