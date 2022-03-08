const Exception = require('../services/Exception');
const ErrorResponse = require('../services/ErrorResponse');
const jwt = require('jsonwebtoken');

const authConfig = {
    secret: process.env.AUTH_SECRET,
    algorithm: process.env.AUTH_ALGORITHM,
}


const requireAuth = (req,res,next) => {
    if(!req.headers.authorization) {
        next(ErrorResponse(Exception(Exception.Types.FORBIDDEN, 'Auth Token missing')));
    }
    const token = req.headers.authorization?.split(' ')[1];
    try {
        req.auth = jwt.verify(token, authConfig.secret);
    } catch(ex) {
        switch(ex.name) {
            case 'TokenExpiredError':
                next(ErrorResponse(Exception(Exception.Types.UNAUTHORIZED, 'Auth Token expired')));
                break;
            case 'JsonWebTokenError':
                next(ErrorResponse(Exception(Exception.Types.UNAUTHORIZED, 'Auth Token invalid')));
                break;
            default:
                next(ErrorResponse(Exception(Exception.Types.UNAUTHORIZED, 'Auth Token invalid')));
        }
    }
    next();
}

module.exports = requireAuth;