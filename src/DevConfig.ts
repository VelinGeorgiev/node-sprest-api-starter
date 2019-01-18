import { IConfig } from './IConfig';

export class DevConfig implements IConfig {
    
    public readonly tenantName: string = "velingeorgiev";
    
    public readonly clientID: string =  "74f4223e-fb8a-499f-b851-2ae8c72553fa";

    public readonly aadCredentials: { identityMetadata: string; clientID: string; } = {
        identityMetadata: `https://login.microsoftonline.com/${this.tenantName}.onmicrosoft.com/.well-known/openid-configuration`, 
        clientID: this.clientID
    };
}