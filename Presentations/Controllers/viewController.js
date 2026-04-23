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
    const contentWork5 = req.t('resume_page.content_work_5', { returnObjects: true }) || [];
    const contentWork4 = req.t('resume_page.content_work_4', { returnObjects: true }) || [];
    const contentWork3 = req.t('resume_page.content_work_3', { returnObjects: true }) || [];
    const contentWork2 = req.t('resume_page.content_work_2', { returnObjects: true }) || [];
    const contentWork1 = req.t('resume_page.content_work_1', { returnObjects: true }) || [];
    
    res.status(200).render('resume',{
        title: 'resume',
        download_url_node: '/download/node',
        download_url_ai_camp: '/download/ai-camp',
        download_url_dasar_ai: '/download/dasar-ai',
        contentWork5,
        contentWork4,
        contentWork3,
        contentWork2,
        contentWork1,
        cookies: req.cookies.i18next
    });
});

exports.getServicePage = catchAsync(async(req, res, next) => {
    res.status(200).render('services',{
        title: 'services'
    });
});

var getPortfolios;

async function fetchPortfolios() {
  const resp = await fetchNode(process.env.API_URL + '/detail', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  });
  const list = await resp.json();

  list.sort((a, b) => {
    const dateA = new Date(a.project_date);
    const dateB = new Date(b.project_date);
    return dateB - dateA;
  });
  return list;
}

exports.getPortfolioPage = catchAsync(async(req, res, next) => {
    const portfolios = await fetchPortfolios();

    const resources = {};
    for (const p of portfolios) {
        const slug = (p.slug || p.id || '').toString();
        if (!slug) continue;
        const base = `portfolio.${slug}.`;
        resources[base + 'project_name'] = p.project_name || '';
        resources[base + 'highlight']    = p.highlight || '';
        resources[base + 'description']  = p.description || '';
    }
    if (Object.keys(resources).length) i18next.addResources('en', 'db', resources);

    res.status(200).render('portfolio', { title: 'portfolio', portfolios, cookies: req.cookies.i18next });
});

exports.getDetailPortfolioPage = catchAsync(async(req, res, next) => {
    const portfolios = await fetchPortfolios();
    const slug = String(req.params.slug || '').toLowerCase();
    const item = portfolios.find(p => (p.slug || '').toLowerCase() === slug);

    if (!item) return next(new AppError('Portfolio not found', 404));

    res.status(200).render('portfolio_details', {
        title: 'Portfolio Details',
        detailPorto: item,
        cookies: req.cookies.i18next
    });
});