import { Request, Response, NextFunction } from 'express';
import { AdminPayload } from '../lib/jwt';
export interface AuthRequest extends Request {
    admin?: AdminPayload;
}
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map