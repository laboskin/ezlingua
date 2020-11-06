const jwt = require('express-jwt');
const config = require('config');
const jwtConfig = config.get('jwtConfig');

const jwtValidationMiddleware = function(admin = false, unlessPath = []) {
    return jwt({secret: jwtConfig[admin?'adminSecret':'secret'], algorithms: ['HS256']})
        .unless({path: unlessPath});
}

module.exports = jwtValidationMiddleware;

