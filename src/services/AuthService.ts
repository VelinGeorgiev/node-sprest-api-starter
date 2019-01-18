import { BearerStrategy } from "passport-azure-ad";
import { ILogger } from '../ILogger';
import { IConfig } from '../IConfig';

export class AuthService {

    public authenticatedUserTokens = [];

    constructor(private config: IConfig, private logger: ILogger) {
        
        this.logger.info("Init new Azure Ad BearerStrategy");
    }

    public getAuthenticationStrategy(): BearerStrategy {

        return new BearerStrategy(this.config.aadCredentials, (token: any, done: Function) => {

            let currentUser;

            const userToken: any = this.authenticatedUserTokens.find((user: any): boolean => {
                currentUser = user;

                return user.sub === token.sub;
            });

            if (!userToken) {
                this.authenticatedUserTokens.push(token);
            }

            return done(null, currentUser, token);
        });
    }
}