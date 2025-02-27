const dotenv = require('dotenv');

const { promisify } = require('util');
dotenv.config({path: './../../Config/env'});
const fetchNode = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

const signToken = id => {
    return jwt.sign({
        id: id,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

const createSendToken = (user, statusCode, res) =>{
    const token = signToken(user.id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRES_COOKIES * 24 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    
    res.cookie('jwt', token, cookieOptions);

    // remove the password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data:{
            user
        }
    });
}

exports.singUp = catchAsync(async (req, res, next) => {
    const password = await bcrypt.hash(req.body.password, 12);
    const body = {name: req.body.name, email: req.body.email, password:password};

    const response = await fetchNode(process.env.API_URL+'/users', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    const newUser = await response.json();
    if(newUser){
        res.status(200).json({
            status: 'success',
            data:{
                newUser
            }
        });
    }
    else{
        res.status(401).json({
            status: 'success',
            message:"Error when creating user"
        });
    }
});

exports.login = catchAsync(async (req, res, next) => {
    // this how to deconstruct the request
    const {email, password} = req.body;
    let user;
    // 1) check if the email and password exists
    if(!email || !password) {
        return next(new AppError('Please provide email and password',400));
    }

    const response = await fetchNode(process.env.API_URL+'/users', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    const fetchAPIUSER = await response.json();

    // const getUserByEmail = response.findOne({email: email});
    for (let i = 0; i < fetchAPIUSER.length; i++) {
        const element = fetchAPIUSER[i];
        if(element.email == email)
        {
            user = element;
            break;
        }
    }
    const checkPass = await correctPassword(password, user.password);
    if(!checkPass){
        return next(new AppError('Incorrect email or password',401));
    }

    createSendToken(user, 200, res);
});

exports.protectAPI = catchAsync(async (req, res, next) => {
    let token;
    let currentUser;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }
    
    if(!token){
        return next(new AppError('You are not login. Please login to get access', 401));
    }

    const verifyToken = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    console.log(verifyToken);
    const response = await fetchNode(process.env.API_URL+'/users', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    const fetchAPIUSER = await response.json();
    
    for (let i = 0; i < fetchAPIUSER.length; i++) {
        const element = fetchAPIUSER[i];
        if(element.id == verifyToken.id)
        {
            currentUser = element;
            break;
        }
    }
    
    if(!currentUser)
    {
        return next(new AppError('The user belonging to this token does no longer exists', 401));
    }

    req.user = currentUser;
    res.locals.user = currentUser;

    next();
});

exports.isLoggedIn = async (req, res, next) => {
    let token;
    // 1) Getting the token and check if it's there
    if(req.cookies.jwt){
        try {
            token = req.cookies.jwt;
            const verifyToken = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    
            const currentUser = await User.findById(verifyToken.id);
            if(!currentUser)
            {
                return next();
            }
    
            if(currentUser.changePasswordAfter(verifyToken.iat))
            {
                return next();
            }
            res.locals.user = currentUser;
            req.user = currentUser;
            return next();    
        } catch (error) {
            return next();
        }
    }
    next();
};

exports.restrictRoute = (...roles) =>{
    return (req, res, next) => {
        // roles is array like ['admin', 'lead-guide']
        
        if(!roles.includes(req.user.role)){
            return next(new AppError(`You don't have permission to perform this action`, 403));
        }
        next();
    };
}