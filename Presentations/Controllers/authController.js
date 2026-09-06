const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const User = require('./../../Models/userModel');

const signToken = id => {
    return jwt.sign({
        id: id,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) =>{
    const token = signToken(user.id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRES_COOKIES * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'lax'
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
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    createSendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    // 1) check if the email and password exists
    if(!email || !password) {
        return next(new AppError('Please provide email and password',400));
    }

    // 2) check if user exists && password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password',401));
    }

    createSendToken(user, 200, res);
});

exports.protectAPI = catchAsync(async (req, res, next) => {
    let token;

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

    const currentUser = await User.findById(verifyToken.id);

    if(!currentUser)
    {
        return next(new AppError('The user belonging to this token does no longer exists', 401));
    }

    if(currentUser.changedPasswordAfter(verifyToken.iat))
    {
        return next(new AppError('User recently changed password. Please login again', 401));
    }

    req.user = currentUser;
    res.locals.user = currentUser;

    next();
});

exports.isLoggedIn = async (req, res, next) => {
    // 1) Getting the token and check if it's there
    if(req.cookies.jwt){
        try {
            const token = req.cookies.jwt;
            const verifyToken = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

            const currentUser = await User.findById(verifyToken.id);
            if(!currentUser)
            {
                return next();
            }

            if(currentUser.changedPasswordAfter(verifyToken.iat))
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
        // roles is array like ['admin', 'user']

        if(!roles.includes(req.user.role)){
            return next(new AppError(`You don't have permission to perform this action`, 403));
        }
        next();
    };
}
