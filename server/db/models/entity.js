import mongoose from 'mongoose';

const entitySchema = new mongoose.Schema({
    oid: Number,
    uuid: Number,
    entity: String,
    saved: Boolean,
    deleted: Boolean,
    cms_start: Date,
    cms_end: Date,
    web_start: Date,
    web_end: Date
});

const Entity = mongoose.model('Entity', entitySchema);

export default Entity;