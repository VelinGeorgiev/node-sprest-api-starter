import { ILogger } from './logger/ILogger';
import { ConsoleLogger } from './logger/ConsoleLogger';

export class ConsoleApp {

    constructor(
        private logger: ILogger = new ConsoleLogger('info')
    ) { }

    public run(): void {
        this.logger.info('ConsoleApp running');
    }
}

const app = new ConsoleApp();
app.run();