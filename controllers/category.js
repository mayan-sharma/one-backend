const slugify = require('slugify');

const db = require('../models');
const errorHandler = require('../lib/errorHandler');

const Category = db.Category;
const Blog = db.Blog;
const Tag = db.Tag;
const User = db.User;

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

exports.getAll = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json({
            message: 'Categories fetched successfully',
            categories
        })

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.getBySlug = async (req, res) => {
    const slug = req.params.slug.toLowerCase();
    try {
        const category = await Category.findOne({
            where: { slug }
        });

        if (!category) {
            return res.status(404).json({
                message: 'Category not found!'
            });
        }

        const blogs = await Blog.findAll({ 
            include: [
                { model: Category, where: { id: category.id } }, 
                { model: Tag },
                { model: User, attributes: ['id', 'name', 'email'] }
            ]
        });

        return res.status(200).json({
            message: 'Category found!',
            category,
            blogs
        });

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.remove = async (req, res) => {
    const slug = req.params.slug.toLowerCase();
    try {
        await Category.destroy({
            where: { slug }
        });

        return res.status(200).json({
            message: 'Category deleted!'
        });

    } catch (err) {
        errorHandler(res, err);
    }
}