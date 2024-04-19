const tokenVerifier = require('./tokenVerify');

function getTokenFromHeaders(req) {
  const authorizationHeader = req.headers['authorization'];
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    return authorizationHeader.substring(7);
  }
  return null;
}

function getTokenFromQuery(req) {
  return req.query.token || null;
}

function identifyTokenSource(req) {
  const tokenFromHeaders = getTokenFromHeaders(req);
  const tokenFromQuery = getTokenFromQuery(req);

  if (tokenFromHeaders && tokenFromQuery) {
    throw new Error('Token is present in both headers and query. Ambiguous token source.');
  }

  if (tokenFromHeaders) {
    return { source: 'headers', token: tokenFromHeaders };
  }

  if (tokenFromQuery) {
    return { source: 'query', token: tokenFromQuery };
  }

  return { source: null, token: null };
}

function tokenMiddleware(certPath) {
  return function (req, res, next) {
    try {
      const { source, token } = identifyTokenSource(req);
      
      if (!source) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Token is missing' });
      }

      const verificationResult = tokenVerifier(token, certPath + '.pub');

      if (!verificationResult.isValid) {
        return res.status(401).json({ error: 'Unauthorized', message: verificationResult.message });
      }

      // Agregar el payload decodificado al objeto de solicitud para que esté disponible en las rutas
      req.authPayload = verificationResult.payload;
      next();
    } catch (error) {
      return res.status(400).json({ error: 'Bad Request', message: error.message });
    }
  };
}

module.exports = tokenMiddleware;
