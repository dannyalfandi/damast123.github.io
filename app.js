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

const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const i18nextFSBackend = require('i18next-fs-backend');

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
else{
    app.use(morgan('combined'));
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

// Serving static files
// app.use(express.static(`${__dirname}/public`));

app.use(compression());

app.use(compression());

/* -------------------- i18next INIT (before your routes) -------------------- */
i18next
  .use(i18nextFSBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    supportedLngs: ['en', 'id', 'ja'],
    fallbackLng: 'en',
    ns: ['common','db'],
    defaultNS: 'common',
    preload: ['en', 'id', 'ja'],
    backend: {
      loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.missing.json'),
    },

    saveMissing: true,
    updateMissing: true,

    detection: {
      order: ['querystring', 'cookie', 'header'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      caches: ['cookie'],
      cookieSecure: false,
      cookieSameSite: 'lax',
    },

    // Pug escapes by default; we keep i18next unescaped
    interpolation: { escapeValue: false },
    returnEmptyString: false,
    cleanCode: true,
  });

app.use(i18nextMiddleware.handle(i18next));

app.use((req, res, next) => {
  res.locals.t = req.t;
  res.locals.lng = req.language;
  next();
});

// Simple language switch route (sets cookie and goes back)
app.get('/set-lang/:lng', (req, res) => {
  const lng = req.params.lng;
  if (!i18next.options.supportedLngs.includes(lng)) return res.status(400).send('Unsupported language');
  res.cookie('i18next', lng, { maxAge: 31536000000, httpOnly: false, sameSite: 'lax' });
  res.redirect('back');
});

app.use('', indexRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;