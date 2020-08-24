let errorHandler = (error, request, response, next) => {
    if (error.status == 401) { /* login filter error */
        response.status(error.status)
        response.json({
            error: error.message
        })
    }
    else{
        response.status(error.errorType.httpCode || 500)
        response.json({
            error: error.errorType
        })
    }
}

module.exports = errorHandler;
