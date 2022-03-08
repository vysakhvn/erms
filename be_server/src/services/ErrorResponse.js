const Exception = require('./Exception');


class ErrorResponseMaker extends Error {
    #message;
    #status;
    #details;

    constructor(status, message, { details = null } = {}){
        super(message);
        this.#message = message.toString();
        this.#status = status;
        this.#details = details;
    }

    static isErrorResponse(error) {
        return !!(typeof error === 'object' && error.stack && error.message && error.status);
    }

    get message() {
        return this.#message;
    }

    get status() {
        return this.#status;
    }

    get details() {
        return this.#details;
    }
}

const ErrorResponse = (ex) => {
    if (ex.message !== undefined) {
        const details = (ex.details !== '' && ex.details !== undefined) ? {details: ex.details} : {};

        switch(ex.message) {
            case Exception.Types.RESOURCE_NOT_FOUND:
                return new ErrorResponseMaker(404,Exception.Types.RESOURCE_NOT_FOUND, details);
            case Exception.Types.DUPLICATE_CONFLICT:
                return new ErrorResponseMaker(409,Exception.Types.DUPLICATE_CONFLICT, details);
            case Exception.Types.INTERNAL_SERVER_ERROR:
                return new ErrorResponseMaker(500,Exception.Types.INTERNAL_SERVER_ERROR, details);
            case Exception.Types.DATA_CONFLICT:
                return new ErrorResponseMaker(409,Exception.Types.DATA_CONFLICT, details);
            case Exception.Types.UNAUTHORIZED:
                return new ErrorResponseMaker(401,Exception.Types.UNAUTHORIZED, details);
            case Exception.Types.FORBIDDEN:
                return new ErrorResponseMaker(403,Exception.Types.FORBIDDEN, details);
            default:
                return new ErrorResponseMaker(500, ex.message, details);
        }
    } else {
        return ex;
    }
}

module.exports = ErrorResponse;