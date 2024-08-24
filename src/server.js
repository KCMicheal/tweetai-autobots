const express = require('express');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/dbConnection');
const createAutobots = require('./autobotProd');
const Autobot = require('./models/Autobot');
const Post = require('./models/Post');
const Comment = require('./models/Comment')


const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5 // Limit each IP to 5 requests per `window` (here, per 1 minute)
});
const app = express();
app.use(express.json());
app.use(limiter);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


//GET AUTO BOTS
app.get('/autobots', async (req, res) => {
    const autobots = await Autobot.findAll({ limit: 10 });
    res.json(autobots);
});


// GET POSTS OF AUTO BOTS
app.get('/autobots/:id/posts', async (req, res) => {
    const posts = await Post.findAll({ where: { autbotId: req.params.id }, limit: 10 });
    res.json(posts);
});


// GET COMMENTS OF A POST
app.get('/posts/:id/comments', async (req, res) => {
    const comments = await Comment.findAll({ where: { postId: req.params.id }, limit: 10 });
    res.json(comments);
});


sequelize.sync()
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to sync the database:', err);
    });
