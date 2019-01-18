import { ILogger } from './ILogger';

export class ConsoleLogger implements ILogger {

    constructor(private loggingLevel: string) {

    }

    public warn(message: string): void {
        console.log(message);
    }

    public error(message: string): void { 
        console.log(message);
    }

    public info(message: string) { 

        if(this.loggingLevel === 'info') {
            console.log(message); 
        }
    }
}