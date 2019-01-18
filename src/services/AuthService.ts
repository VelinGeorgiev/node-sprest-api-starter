import { BearerStrategy } from "passport-azure-ad";
import { ILogger } from '../ILogger';
import { IConfig } from '../IConfig';

export class AuthService {

    public authenticatedUserTokens = [];
    public aadCredentials: Object;

    constructor(private config: IConfig, private logger: ILogger) {

        this.logger.info(`Init new Azure Ad BearerStrategy with config ${JSON.stringify(config)}`);

        // default
        this.aadCredentials = {
            identityMetadata: this.config.identityMetadata,
            clientID: this.config.clientID
        }
    }

    public getAuthenticationStrategy(): BearerStrategy {

        try {
            return new BearerStrategy(this.aadCredentials, (token: any, done: Function) => {

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
        } catch (err) {

            this.logger.error(err);
        }

    }
}