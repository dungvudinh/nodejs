const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
    {
        image_url: { type: String, require },
        desc: { type: String },
        title: { type: String },
        video_id: { type: String },
        slug: { type: String, slug: 'title', unique: true },
    },
    { timestamps: true },
);
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Course', Course);
