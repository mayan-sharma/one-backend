const slugify = require('slugify');

const db = require('../models');
const errorHandler = require('../lib/errorHandler');

const Tag = db.Tag;

exports.create = async (req, res) => {
    const { name } = req.body;
    const slug = slugify(name).toLowerCase();

    try {
        await Tag.create({
            name, slug
        });

        return res.status(200).json({
            message: 'Tag created successfully!',
            tag: { name, slug }
        });

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        return res.status(200).json({
            message: 'Tags fetched successfully',
            tags
        })

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.getBySlug = async (req, res) => {
    const slug = req.params.slug.toLowerCase();
    try {
        const tag = await Tag.findOne({
            where: { slug }
        });

        if (!tag) {
            return res.status(404).json({
                message: 'Tag not found!'
            });
        }

        return res.status(200).json({
            message: 'Tag found!',
            tag
        });

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.remove = async (req, res) => {
    const slug = req.params.slug.toLowerCase();
    try {
        await Tag.destroy({
            where: { slug }
        });

        return res.status(200).json({
            message: 'Tag deleted!'
        });

    } catch (err) {
        errorHandler(res, err);
    }
}