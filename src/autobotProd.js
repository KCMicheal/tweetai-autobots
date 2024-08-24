const axios = require('axios');
const Autobot = require('./models/Autobot');
const Post = require('./models/Post');
const Comment = require('./models/Comment')

const createAutobots = async () => {
    for (let i = 0; i < 500; i++) {
        const { data: user } = await axios.get('https://jsonplaceholder.typicode.com/users/' + (i % 10 + 1));

        const newAutobot = await Autobot.create({
            name: user.name,
            username: user.username + Math.random().toString(36).substring(7),
            email: user.email
        });

        for (let j = 0; j < 10; j++) {
            const { data: post } = await axios.get('https://jsonplaceholder.typicode.com/posts/' + (j % 10 + 1));
            const newPost = await Post.create({
                autbotId: newAutobot.id,
                title: post.title + Math.random().toString(36).substring(7),
                body: post.body
            });

            for (let k = 0; k < 10; k++) {
                const { data: comment } = await axios.get('https://jsonplaceholder.typicode.com/comments/' + (k % 10 + 1));
                await Comment.create({
                    postId: newPost.id,
                    name: comment.name,
                    email: comment.email,
                    body: comment.body
                });
            }
        }
    }
};

setInterval(createAutobots, 60 * 60 * 1000); // Run every hour
module.exports = createAutobots;