const formidable = require('formidable');
const slugify = require('slugify');
const { stripHtml } = require('string-strip-html');
const _ = require('lodash');
const fs = require('fs');

const getExcerpt = require('../lib/getExcerpt');
const errorHandler = require('../lib/errorHandler');
const db = require('../models');

const Blog = db.Blog;
const Category = db.Category;
const Tag = db.Tag;
const User = db.User;

exports.create = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ fields, files });
            });
        });

        const { title, body, categories, tags } = fields;

        if (!title || !title.length) {
            return res.status(400).json({
                message: 'Title required'
            });
        }

        if (!body || body.length < 100) {
            return res.status(400).json({
                message: 'Content is too short'
            });
        }

        if (!categories || categories.length === 0) {
            return res.status(400).json({
                message: 'Atleast 1 category required'
            });
        }

        if (!tags || tags.length === 0) {
            return res.status(400).json({
                message: 'Atleast 1 tag required'
            });
        }

        let photo = null;

        if (files.photo) {
            // 1mb
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    message: 'Image should be less than 1mb'
                });
            }
            photo = fs.readFileSync(files.photo.path);
        }

        await db.transaction(async (transaction) => {
            try {
                const blog = await Blog.create({
                    title,
                    body,
                    photo,
                    slug: slugify(title).toLowerCase(),
                    metaTitle: `${title} | one`,
                    metaDesc: stripHtml(body.substring(0, 160)).result,
                    excerpt: getExcerpt(body, 320, ' ', '...'), 
                    UserId: req.user.id,    
                }, { transaction });
    
                const dbCategories = await Category.findAll({ where: { id: categories.split(',') } }, { transaction });
                const dbTags = await Tag.findAll({ where: { id: categories.split(',') } }, { transaction });
                
                await blog.addCategories(dbCategories, { transaction });
                await blog.addTags(dbTags, { transaction });

            } catch (err) {
                errorHandler(res, err);               
            }
        });

        return res.status(200).json({
            message: 'Blog created successfully',
            blog: {
                title
            }
        });

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            attributes: ['id', 'title', 'slug', 'excerpt'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Category,
                    attributes: ['id', 'name', 'slug']
                },
                {
                    model: Tag,
                    attributes: ['id', 'name', 'slug']
                }
            ]
        });

        return res.status(200).json({
            message: 'All blogs fetched successfully',
            blogs
        });

    } catch (err) {
        errorHandler(res, err);
    }
}

exports.getBySlug = async (req, res) => {

}

exports.remove = async (req, res) => {

}

exports.update = async (req, res) => {

}