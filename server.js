const dotenv = require('dotenv');

process.on('uncaughtException', err => {

    console.log('UNCAUGHT EXCEPTION: Shutting down...');
    console.log(err.name, err.message);

    process.exit(1);
});

dotenv.config({path: './config.env'});

const connectDB = require('./Config/connectDb');
const app = require('./app');

connectDB();

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
