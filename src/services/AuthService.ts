import { IConfig } from '../config/IConfig';
import { ILogger } from '../logger/ILogger';
import { BearerStrategy } from "passport-azure-ad";

export class AuthService {

    public readonly strategy: BearerStrategy;

    constructor(
        private config: IConfig,
        private logger: ILogger
    ) {

        const strategyConfig = {
            identityMetadata: this.config.identityMetadata,
            clientID: this.config.clientID
        }

        this.logger.info(`New BearerStrategy. Config: ${JSON.stringify(strategyConfig)}`);

        this.strategy = new BearerStrategy(strategyConfig, this.verifyUser);
    }

    public verifyUser(token: any, done: Function): void {

        return done(null, token);
    }
}