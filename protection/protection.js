const csrf = require('csurf');
const helmet = require('helmet');
const xss = require('xss');

function generateCSRFToken(req, res, next) {
    const csrfToken = crypto.randomBytes(16).toString('hex');
    req.session.csrfToken = csrfToken;
    next();
}

function verifyCSRFToken(req, res, next) {
    const token = req.body.csrfToken || req.query.csrfToken || req.headers['csrf-token'];
    if (!token || token !== req.session.csrfToken) {
        return res.status(403).send('CSRF token mismatch');
    }
    next();
}

function sanitizeInput(req, res, next) {
    req.body = xss.clean(req.body);
    next();
}

const csrfProtection = csrf({ cookie: true });
const helmetMiddleware = helmet();
const xssProtection = sanitizeInput;

module.exports = {
    generateCSRFToken,
    verifyCSRFToken,
    csrfProtection,
    helmetMiddleware,
    xssProtection
};