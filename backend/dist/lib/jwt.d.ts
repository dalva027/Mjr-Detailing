export declare const ACCESS_EXPIRES_IN = "15m";
export declare const REFRESH_EXPIRES_IN = "7d";
export interface AdminPayload {
    id: string;
    email: string;
}
export declare function signAccessToken(payload: AdminPayload): string;
export declare function signRefreshToken(id: string): string;
export declare function verifyAccessToken(token: string): AdminPayload | null;
export declare function verifyRefreshToken(token: string): {
    id: string;
} | null;
//# sourceMappingURL=jwt.d.ts.map