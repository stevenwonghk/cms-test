import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';

import { setupI18n, setupTwig } from './services/bootstrap';

var app = express();
setupI18n(app);
setupTwig(app);

app.use([
    logger('dev'),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(),
    express.static('./public')
]);
app.use('/:preview(preview)?/:lang(en|tc)?', function (req, res, next) {
    req.preview = req.params.preview === 'preview';
    req.lang = req.params.lang ?? (process.env.DEFAULT_LANGUAGE ?? 'en');
    const map = {
        'en': 'en',
        'tc': 'zh-HK'
    }
    req.i18n.changeLanguage(map[req.lang]);
    indexRouter(req, res, next);
});
app.use((req, res, next) => {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
export default app;
