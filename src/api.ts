import * as passport from "passport";
import * as restify from "restify";
import * as restifyPlugins from "restify-plugins";
import { ILogger } from './ILogger';
import { HelloService } from './services/HelloService';
import { AuthService } from './services/AuthService';

export class Api {

    constructor(
        private helloService: HelloService,
        private authService: AuthService,
        private logger: ILogger,
        private port: string
    ) {}

    public createServer(): any {

        // server
        const server = restify.createServer({ name: 'Azure Active Directroy with Node.js Demo' });

        // middleware
        passport.use(this.authService.strategy);
        server.use(restifyPlugins.authorizationParser());
        server.use(passport.initialize());
        server.use(passport.session());

        // routing
        server.get('/', this.helloService.sayHello);
        server.get('/api/secured', passport.authenticate('oauth-bearer', { session: false }), this.helloService.sayHelloSecurely);


        server.listen(process.env.PORT || this.port);

        this.logger.info(`Server running http://localhost: ${process.env.PORT || this.port}`);

        return server;
    }
}