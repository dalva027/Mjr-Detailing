"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_EXPIRES_IN = exports.ACCESS_EXPIRES_IN = void 0;
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret-change-in-production';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-production';
exports.ACCESS_EXPIRES_IN = '15m';
exports.REFRESH_EXPIRES_IN = '7d';
function signAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, ACCESS_SECRET, {
        algorithm: 'HS256',
        expiresIn: exports.ACCESS_EXPIRES_IN,
        subject: payload.id,
    });
}
function signRefreshToken(id) {
    return jsonwebtoken_1.default.sign({ id }, REFRESH_SECRET, {
        algorithm: 'HS256',
        expiresIn: exports.REFRESH_EXPIRES_IN,
        subject: id,
    });
}
function verifyAccessToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_SECRET, {
            algorithms: ['HS256'],
            issuer: 'admin-dashboard',
        });
        return decoded;
    }
    catch {
        return null;
    }
}
function verifyRefreshToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, REFRESH_SECRET, {
            algorithms: ['HS256'],
            issuer: 'admin-dashboard',
        });
        return decoded;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=jwt.js.map