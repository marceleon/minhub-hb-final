const jwt = require('jsonwebtoken');

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    console.log(req);
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
        console.log(token, verified);
        next(); // continuamos
    } catch (error) {
        return res.status(400).json({ error: 'token no es válido' });
    }
};

module.exports = verifyToken;
