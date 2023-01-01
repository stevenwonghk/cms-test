import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

import { setupI18n, setupTwig } from './services/bootstrap';

var app = express();
setupI18n(app);
setupTwig(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use('/', indexRouter);
app.use('/en/', indexRouter);
app.use('/zh-hk/', indexRouter);
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