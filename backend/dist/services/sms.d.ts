interface AppointmentData {
    id: string;
    name: string;
    phone: string;
    service: string;
    date: Date;
    status: string;
}
export declare function sendConfirmationSMS(toPhone: string, appointment: AppointmentData): Promise<void>;
export declare function sendAdminSMS(toPhone: string, appointment: AppointmentData): Promise<void>;
export declare function sendStatusUpdateSMS(toPhone: string, status: string, appointment: AppointmentData): Promise<void>;
export {};
//# sourceMappingURL=sms.d.ts.map