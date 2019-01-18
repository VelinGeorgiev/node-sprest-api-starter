import { Api } from "./api";
import { HelloService } from './services/HelloService';
import { AuthService } from './services/AuthService';
import { ConsoleLogger } from './ConsoleLogger';
import { ILogger } from './ILogger';
import { IConfig } from './IConfig';
import { DevConfig } from './DevConfig';

const logger: ILogger = new ConsoleLogger('info');
const config: IConfig = new DevConfig();

const helloService: HelloService = new HelloService();
const authService: AuthService = new AuthService(config, logger);

const api = new Api(helloService, authService, logger);
api.createServer();