import * as passport from "passport";
import * as restify from "restify";
import * as restifyPlugins from "restify-plugins";
import { AuthService } from './services/AuthService';
import { HelloService } from './services/HelloService';
import { ILogger } from './ILogger';

export class Api {

    constructor(private helloService: HelloService, private auth: AuthService, private logger: ILogger) {
    }

    public createServer(): any {

        // server
        const server = restify.createServer({ name: 'Azure Active Directroy with Node.js Demo' });

        // middleware
        passport.use(this.auth.getAuthenticationStrategy());
        server.use(restifyPlugins.authorizationParser());
        server.use(passport.initialize());
        server.use(passport.session());

        // routing
        server.get('/', this.helloService.sayHello);
        server.get('/api/secured', passport.authenticate('oauth-bearer', { session: false }), this.helloService.secured);

        
        server.listen(process.env.PORT || 3000);

        this.logger.info('Server running http://localhost:3000');

        return server;
    }
}