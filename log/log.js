const fs = require('fs');
const path = require('path');

function logError(error) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${error.stack}\n`;

    const logFilePath = path.join(__dirname, 'errors.log');

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    // Show message in console
    console.error('An error has been logged. Refer to the log file for more details.');
}

module.exports.logError = logError;

function errorLogger(err, req, res, next) {
    if (err) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp}: ${err.stack}\n`;

        const logFilePath = path.join(__dirname, 'errors.log');

        fs.appendFile(logFilePath, logMessage, (error) => {
            if (error) {
                console.error('Error writing to log file:', error);
            }
        });

        if (err.statusCode) {
            return next(err);
        } else {
            res.status(500).send('An unexpected error occurred. Please try again later.');
        }

        return;
    }

    next();
}

module.exports.errorLogger = errorLogger;