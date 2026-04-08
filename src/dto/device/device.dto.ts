export interface DeviceDto {
    id: string;
    lastModifiedDate?: string;
    lastAuthenticatedDate?: string;
    device?: string;
    operatingSystem?: string;
    version?: string;
    browser?: string;
    ip?: string;
    providerName?: string;
    timestamp?: string;
    location?: string;
    loginMethod?: string;
    isThis?: boolean;
}
