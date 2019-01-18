export interface IConfig {
    tenantName: string;
    clientID: string;
    aadCredentials: { identityMetadata: string; clientID: string };
}