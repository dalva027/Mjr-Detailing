import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, AdminPayload } from '../lib/jwt';

export interface AuthRequest extends Request {
  admin?: AdminPayload;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
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

  const payload = verifyAccessToken(accessToken);
  if (!payload) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  req.admin = payload;
  next();
}

function parseCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp('(?:^|;)\\s*' + name + '\\s*=\\s*([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}
