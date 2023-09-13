const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Course = new Schema(
    {
        _id: { type: Number },
        image_url: { type: String, require },
        desc: { type: String },
        title: { type: String },
        video_id: { type: String },
        slug: { type: String, slug: 'title', unique: true },
    },
    { _id: false, timestamps: true },
);

Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
Course.plugin(AutoIncrement);
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['esc, desc'].includes(req.query.type);
        return this.sort({
            [req.query.col]: isValidType ? req.query.type : 'desc',
        }).lean();
    }
    return this;
};
mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);
