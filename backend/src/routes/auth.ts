import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
} from '../lib/jwt';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { verifyAdminEmail, updateAdminRefreshToken } from '../services/admin';

const router = Router();
const cookieParserMiddleware = cookieParser();

// Rate limiter for login - tight limits to prevent brute force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { error: 'Too many login attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 15 * 60 * 1000, // 15 min
    path: '/api/auth',
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth/refresh',
  });
}

// POST /api/auth/login
router.post('/login', loginLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await verifyAdminEmail(email);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = signAccessToken({ id: admin.id, email: admin.email });
    const refreshToken = signRefreshToken(admin.id);

    await updateAdminRefreshToken(admin.id, refreshToken);

    setAuthCookies(res, accessToken, refreshToken);

    res.json({
      message: 'Logged in',
      user: { id: admin.id, email: admin.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/refresh
router.post('/refresh', (req: Request, res: Response) => {
  cookieParserMiddleware(req, res, async () => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token' });
      }

      const decoded = verifyRefreshToken(refreshToken);
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }

      const admin = await verifyAdminEmail(decoded.id);
      if (!admin || admin.refreshToken !== refreshToken) {
        return res.status(401).json({ error: 'Refresh token revoked' });
      }

      const newAccessToken = signAccessToken({ id: admin.id, email: admin.email });
      const newRefreshToken = signRefreshToken(admin.id);

      await updateAdminRefreshToken(admin.id, newRefreshToken);

      setAuthCookies(res, newAccessToken, newRefreshToken);

      res.json({
        message: 'Refreshed',
        user: { id: admin.id, email: admin.email },
      });
    } catch (error) {
      console.error('Refresh error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// POST /api/auth/logout
router.post('/logout', authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    if (req.admin) {
      updateAdminRefreshToken(req.admin.id, null).catch(console.error);
    }
    res.clearCookie('accessToken', { path: '/api/auth' });
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.json({ message: 'Logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ user: req.admin });
});

export default router;
