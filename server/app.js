import createError from 'http-errors';
import express from 'express';
import Twig from 'twig';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';

var app = express();

i18next
.use(Backend)
.use(i18nextMiddleware.LanguageDetector)
.init({
  backend: {
    loadPath: './server/locales/{{lng}}/{{ns}}.json',
  },
  debug: false,
  detection: {
    order: ['path', 'querystring', 'cookie'],
    caches: ['cookie']  // we may not need this line
  },
  fallbackLng: 'en',
  preload: ['en', 'zh-hk']
});
app.use(i18nextMiddleware.handle(i18next));
Twig.cache(app.get('env') === 'production');
app.set('views', './server/views');
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use((req, res, next) => {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
export default app;