const Types  = {
    RESOURCE_NOT_FOUND: 'Resource not found',
    DUPLICATE_CONFLICT: 'Duplicate exists',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    DATA_CONFLICT: 'Data conflict',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Token missing/invalid',
}

class ErrorToThrow extends Error{
    details;

    constructor(message, details){
        super(message);
        this.details = details;
    }
}

module.exports = (title,details={}) => new ErrorToThrow(title,details);
module.exports.Types = Types;