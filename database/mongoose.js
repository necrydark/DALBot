const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            userUnifiedTopology: true,
            useFindAndModify: false,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(`mongodb+srv://dark:${process.env.PASS}@discordbot.yeaiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, dbOptions);

        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('connected');
        });



        mongoose.connection.on('disconnected', () => {
            console.log('disconnected');
        });
        mongoose.connection.on('err', (err) => {
            console.log(err);
        });
    }
}