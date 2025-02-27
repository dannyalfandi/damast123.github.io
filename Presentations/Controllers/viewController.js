const path = require('path');
// const Tour = require('../models/tourModel');
const catchAsync = require('../../utils/catchAsync');
const jsonfile = require('jsonfile');

const file = path.join(__dirname, '../../Config/detailPorto.json');

// const AppError = require('../utils/appError');
// const User = require('../models/userModel');
// const Bookings = require('../models/bookingModel');
// const Review = require('../models/reviewModel');
// const Favorite = require('../models/favModel');

exports.getHomePage = catchAsync(async(req, res, next) => {
    // // 1) Get all tour data from collection
    // const tours = await Tour.find();
    // // 2) Check if there is user logged in
    // let userFavorites = [];
    // if (req.user) {
    //     userFavorites = await Favorite.find({ user: req.user._id }).select('tour isFav');
    // }
    // // 3) Map through tours and add `isFav` flag for each based on userFavorites
    // const toursWithFavorites = tours.map(tour => {
    //     const fav = userFavorites.find(favorite => favorite.tour.equals(tour._id));
    //     return { 
    //         ...tour.toObject(), // Convert Mongoose document to plain JS object
    //         isFav: fav ? fav.isFav : false // Set `isFav` to true if it's a favorite, otherwise false
    //     };
    // });

    // 4) Render template
    res.status(200).render('home',{
        title: 'home'
    });
});

exports.getAboutPage = catchAsync(async(req, res, next) => {
    res.status(200).render('about',{
        title: 'about'
    });
});

exports.getContactPage = catchAsync(async(req, res, next) => {
    res.status(200).render('contact',{
        title: 'contact'
    });
});

exports.getResumePage = catchAsync(async(req, res, next) => {
    res.status(200).render('resume',{
        title: 'resume'
    });
});

exports.getServicePage = catchAsync(async(req, res, next) => {
    res.status(200).render('services',{
        title: 'services'
    });
});

exports.getPortfolioPage = catchAsync(async(req, res, next) => {
    res.status(200).render('portfolio',{
        title: 'portfolio'
    });
});

exports.getDetailPortfolioPage = catchAsync(async(req, res, next) => {
    const jsonParse = jsonfile.readFileSync(file);
    let detailPorto = jsonParse.find(p=>p.project_name == req.params.name)
    console.log('data detailPorto: ',detailPorto);
    res.status(200).render('portfolio_details',{
        title: 'Portfolio Details',
        detailPorto
    });
});

// exports.getLoginForm = catchAsync(async (req, res) => {
//     res.status(200)
//     .set(
//         'Content-Security-Policy',
//         "connect-src 'self' https://cdnjs.cloudflare.com",
//       )
//         .render('login', {
//         title: 'Log into your account'
//     });
// });

// exports.getAccount = catchAsync(async (req, res, next) => {
//     res.status(200).render('account', {
//         title: 'Your account'
//     });
// });