const fetchNode = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const catchAsync = require('../../utils/catchAsync');

exports.getHomePage = catchAsync(async(req, res, next) => {
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
    const contentWork4 = req.t('resume_page.content_work_4', { returnObjects: true }) || [];
    const contentWork3 = req.t('resume_page.content_work_3', { returnObjects: true }) || [];
    const contentWork2 = req.t('resume_page.content_work_2', { returnObjects: true }) || [];
    const contentWork1 = req.t('resume_page.content_work_1', { returnObjects: true }) || [];
    res.status(200).render('resume',{
        title: 'resume',
        contentWork4,
        contentWork3,
        contentWork2,
        contentWork1
    });
});

exports.getServicePage = catchAsync(async(req, res, next) => {
    res.status(200).render('services',{
        title: 'services'
    });
});

var getPortfolios;

exports.getPortfolioPage = catchAsync(async(req, res, next) => {
    const response = await fetchNode(process.env.API_URL+'/detail', {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
    });

    getPortfolios = await response.json();
    
    getPortfolios.sort((a, b) => {
        const [monthA, yearA] = a.project_date.split(' ').map(Number);
        const [monthB, yearB] = b.project_date.split(' ').map(Number);
      
        return yearA - yearB || monthA - monthB;
      });

    res.status(200).render('portfolio',{
        title: 'portfolio',
        portfolios: getPortfolios 
    });
});

exports.getDetailPortfolioPage = catchAsync(async(req, res, next) => {
    const getPortfolio = getPortfolios.find(p=>p.slug == req.params.slug);
    res.status(200).render('portfolio_details',{
        title: 'Portfolio Details',
        detailPorto:getPortfolio
    });
});