import express from 'express';
import mongoose from 'mongoose';
import Entity from '../db/models/entity.js';
import faker from 'faker';

class MongooseController {
    static list(req, res, next) {
        // mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGOOSE_DSN).then(() => { console.log('MongoDB Connected !') });
        const db = mongoose.connection;

        // Bind connection to error event (to get notification of connection errors)
        db.on("error", console.error.bind(console, "MongoDB connection error:"));

        const a = new Entity({
            oid: 2,
            uuid: 2,
            entity: 'page',
            saved: true,
            deleted: false,
            cms_start: new Date(),
            cms_end: '9999-12-31',
            web_start: new Date(),
            web_end: '9999-12-31'
        });
        a.save((err) => {
            if (err) return handleError(err);
            // saved!
            Entity.find({ entity: 'page' }, "oid uuid entity cms_start cms_end web_start web_end").exec((err, docs) => {
                if (err) return handleError(err);
                res.json(docs);
            });
        });
    }
}

export default MongooseController;