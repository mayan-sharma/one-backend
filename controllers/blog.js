const db = require('../models');

const Blog = db.Blog;

const testRoute = (req, res) => {
    res.send({
        message: 'Blog Route'
    });
}

module.exports = testRoute;