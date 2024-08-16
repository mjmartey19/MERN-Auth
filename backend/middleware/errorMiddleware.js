const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalURL}`);
    res.status(404)
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = req.statusCode === 200 ? 500 : req.statusCode;
    let message = err.message;

    //mongoose custom error
    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({ message, stack: err.stack });
}

export { notFound, errorHandler };