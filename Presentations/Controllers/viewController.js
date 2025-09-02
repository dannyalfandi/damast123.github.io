const fetchNode = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const catchAsync = require('../../utils/catchAsync');
const i18next = require('i18next');

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
    const MONTHS = { january:1,february:2,march:3,april:4,may:5,june:6,
                   july:7,august:8,september:9,october:10,november:11,december:12 };
    getPortfolios.sort((a,b) => {
        const [ma, ya] = (a.project_date || '').split(' ');
        const [mb, yb] = (b.project_date || '').split(' ');
        const A = (parseInt(ya) || 0) * 100 + (MONTHS[(ma||'').toLowerCase()] || 0);
        const B = (parseInt(yb) || 0) * 100 + (MONTHS[(mb||'').toLowerCase()] || 0);
        return A - B;
    });

    const resources = {};
    for (const p of getPortfolios) {
        const slug = (p.slug || p.id || '').toString();
        if (!slug) continue;
        const base = `portfolio.${slug}.`;
        resources[base + 'project_name'] = p.project_name || '';
        resources[base + 'highlight']    = p.highlight || '';
        resources[base + 'description']  = p.description || '';
    }

    if (Object.keys(resources).length) {
        i18next.addResources('en', 'db', resources);
    }

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