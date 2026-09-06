const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const Portfolio = require('./../../Models/portfolioModel');

exports.createPortfolio = catchAsync(async(req, res, next) => {
    const newPortfolio = await Portfolio.create({
        project_name: req.body.project_name,
        category_project: req.body.category_project,
        project_from: req.body.project_from,
        project_date: req.body.project_date,
        highlight: req.body.highlight,
        description: req.body.description,
        images: req.body.images
    });

    res.status(200).json({
        status: 'success',
        data:{
            newPortfolio
        }
    });
});

exports.updatePortfolio = catchAsync(async(req, res, next) => {
    const newPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, {
        images: req.body.images
    }, {
        new: true,
        runValidators: true
    });

    if(!newPortfolio){
        return next(new AppError('No portfolio found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data:{
            newPortfolio
        }
    });
});

exports.getPortfolio = catchAsync(async(req, res, next) => {
    const portfolios = await Portfolio.find();

    res.status(200).json({
        status: 'success',
        results: portfolios.length,
        data: {
            portfolios
        }
    });
});

exports.getDetailPortfolio = catchAsync(async(req, res, next) => {
    const portfolio = await Portfolio.findById(req.params.id);

    if(!portfolio){
        return next(new AppError('No portfolio found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            portfolio
        }
    });
});
