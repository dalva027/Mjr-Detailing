"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jwt_1 = require("../lib/jwt");
const auth_1 = require("../middleware/auth");
const admin_1 = require("../services/admin");
const router = (0, express_1.Router)();
const cookieParserMiddleware = (0, cookie_parser_1.default)();
function setAuthCookies(res, accessToken, refreshToken) {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000, // 15 min
        path: '/api/auth',
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/api/auth/refresh',
    });
}
// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const admin = await (0, admin_1.verifyAdminEmail)(email);
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const valid = await bcrypt_1.default.compare(password, admin.passwordHash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const accessToken = (0, jwt_1.signAccessToken)({ id: admin.id, email: admin.email });
        const refreshToken = (0, jwt_1.signRefreshToken)(admin.id);
        await (0, admin_1.updateAdminRefreshToken)(admin.id, refreshToken);
        setAuthCookies(res, accessToken, refreshToken);
        res.json({
            message: 'Logged in',
            user: { id: admin.id, email: admin.email },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
    cookieParserMiddleware(req, res, async () => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ error: 'No refresh token' });
            }
            const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
            if (!decoded) {
                return res.status(401).json({ error: 'Invalid refresh token' });
            }
            const admin = await (0, admin_1.verifyAdminEmail)(decoded.id);
            if (!admin || admin.refreshToken !== refreshToken) {
                return res.status(401).json({ error: 'Refresh token revoked' });
            }
            const newAccessToken = (0, jwt_1.signAccessToken)({ id: admin.id, email: admin.email });
            const newRefreshToken = (0, jwt_1.signRefreshToken)(admin.id);
            await (0, admin_1.updateAdminRefreshToken)(admin.id, newRefreshToken);
            setAuthCookies(res, newAccessToken, newRefreshToken);
            res.json({
                message: 'Refreshed',
                user: { id: admin.id, email: admin.email },
            });
        }
        catch (error) {
            console.error('Refresh error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});
// POST /api/auth/logout
router.post('/logout', auth_1.authMiddleware, (req, res) => {
    try {
        if (req.admin) {
            (0, admin_1.updateAdminRefreshToken)(req.admin.id, null).catch(console.error);
        }
        res.clearCookie('accessToken', { path: '/api/auth' });
        res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
        res.json({ message: 'Logged out' });
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /api/auth/me
router.get('/me', auth_1.authMiddleware, (req, res) => {
    res.json({ user: req.admin });
});
exports.default = router;
//# sourceMappingURL=auth.js.map