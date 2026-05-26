export declare function createAdmin(email: string, password: string): Promise<number>;
export declare function verifyAdminEmail(email: string): Promise<{
    id: string;
    email: string;
    passwordHash: string;
    refreshToken: string | null;
} | null>;
export declare function updateAdminRefreshToken(id: string, token: string | null): Promise<void>;
export declare function seedAdmin(email: string, password: string): Promise<void>;
//# sourceMappingURL=admin.d.ts.map