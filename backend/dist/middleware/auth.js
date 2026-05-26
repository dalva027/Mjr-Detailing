"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../lib/jwt");
function authMiddleware(req, res, next) {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }
    const accessToken = parseCookie(cookieHeader, 'accessToken');
    if (!accessToken) {
        res.status(401).json({ error: 'No access token' });
        return;
    }
    const payload = (0, jwt_1.verifyAccessToken)(accessToken);
    if (!payload) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
    }
    req.admin = payload;
    next();
}
function parseCookie(header, name) {
    const match = header.match(new RegExp('(?:^|;)\\s*' + name + '\\s*=\\s*([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}
//# sourceMappingURL=auth.js.map