const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    
    console.log('UNCAUGHT EXCEPTION: Shutting down...');
    console.log(err.name, err.message);

    process.exit(1);
});

dotenv.config({path: './config.env'});
// const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

const app = require('./app');

// mongoose.connect(DB).then(console.log('connecting to database'));

const port = process.env.PORT || 3300;

//4) start server
const server = app.listen(port,()=>{
    console.log('connecting to port',port);    
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION: Shutting down...');
    console.log(err.name, err.message);
    server.close(()=>{
        process.exit(1);
    });
});
