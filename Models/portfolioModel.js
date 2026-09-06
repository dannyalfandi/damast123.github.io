const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: [true, 'A portfolio item must have a project name'],
        trim: true
    },
    category_project: {
        type: String,
        trim: true
    },
    project_from: {
        type: String,
        trim: true
    },
    project_date: Date,
    highlight: String,
    description: String,
    images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
