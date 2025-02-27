const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const { xss } = require("express-xss-sanitizer");
const hpp = require('hpp');
const AppError = require('./utils/appError');
const indexRouter = require('./Presentations/Routes/index');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const scriptSrcUrls = ['https://unpkg.com/',
    'https://tile.openstreetmap.org',"https://js.stripe.com"];
const styleSrcUrls = [
    'https://unpkg.com/',
    'https://tile.openstreetmap.org',
    'https://fonts.googleapis.com/',
    'https://cdnjs.cloudflare.com/'
];
const connectSrcUrls = ['https://unpkg.com', 'https://tile.openstreetmap.org'];
const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com', 'https://cdnjs.cloudflare.com/'];

app.use(
    cors({
      origin: 'http://localhost:8800',
      credentials: true,
    })
);

app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", 'blob:'],
      objectSrc: [],
      imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
      fontSrc: ["'self'", ...fontSrcUrls]
    }
  }));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 40,
    window: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
});

app.use('/api',limiter);
app.use(express.json({
    limit: '10kb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}));

app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());

// prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));

// Serving static files
// app.use(express.static(`${__dirname}/public`));

app.use(compression());

app.use('', indexRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;