const slugify = require('slugify');

const Category = require('../models/Category');
const errorHandler = require('../lib/errorHandler');

exports.create = async (req, res) => {
    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    try {
        await Category.create({
            name, slug
        });

        return res.status(200).json({
            message: 'Category created successfully!',
            category: { name, slug }
        });

    } catch (err) {
        errorHandler(res, err);
    }
}