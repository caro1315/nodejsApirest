function logErrors(err, req, res, next) {
    console.error(err);
    next(err); // Tipo error
}

function logHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}

function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

module.exports = { logErrors, logHandler, boomErrorHandler }
