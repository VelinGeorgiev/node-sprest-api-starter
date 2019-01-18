
import { HelloService } from './services/HelloService';
import { ConsoleLogger } from './ConsoleLogger';
import { ILogger } from './ILogger';
import { IConfig } from './IConfig';
import { DevConfig } from './DevConfig';
import { Api } from './Api'; 

const logger: ILogger = new ConsoleLogger('info');
const config: IConfig = new DevConfig();

const helloService: HelloService = new HelloService();

const api = new Api(helloService, config, logger, '3000');
const server: any = api.createServer();

export default server;