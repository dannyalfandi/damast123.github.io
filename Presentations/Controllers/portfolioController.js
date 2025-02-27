const fetchNode = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const catchAsync = require('./../../utils/catchAsync');

exports.createPortfolio = catchAsync(async(req, res, next) => {
    const body = {project_name: req.body.project_name, category_project: req.body.category_project, project_from:req.body.project_from, project_date:req.body.project_date, highlight:req.body.highlight, description:req.body.description, images:req.body.images};

    const response = await fetchNode(process.env.API_URL+'/detail', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    const newPortfolio = await response.json();

    if(newPortfolio){
        res.status(200).json({
            status: 'success',
            data:{
                newPortfolio
            }
        });
    }
    else{
        res.status(401).json({
            status: 'success',
            message:"Error when creating portfolio"
        });
    }
});

exports.updatePortfolio = catchAsync(async(req, res, next) => {
    const body = {project_name: req.body.project_name, category_project: req.body.category_project, project_from:project_from, project_date:project_date, highlight:highlight, description:description, images:images};

    const response = await fetchNode(process.env.API_URL+'/detail', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    const newPortfolio = await response.json();

    if(newPortfolio){
        res.status(200).json({
            status: 'success',
            data:{
                newPortfolio
            }
        });
    }
    else{
        res.status(401).json({
            status: 'success',
            message:"Error when creating portfolio"
        });
    }
});

exports.getPortfolio = catchAsync(async(req, res, next) => {
    const response = await fetchNode(process.env.API_URL+'/detail', {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
    });
    const getPortfolios = await response.json();
    res.status(200).render('about',{
        title: 'portfolio',
        portfolios: getPortfolios
    });
});

exports.getDetailPortfolio = catchAsync(async(req, res, next) => {
    const response = await fetchNode(process.env.API_URL+'/detail/'+req.params.id, {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
    });
    const getPortfolio = await response.json();
    res.status(200).render('about',{
        title: 'about'
    });
});