import { ConsoleApp } from './ConsoleApp';
import { ConsoleLogger } from './ConsoleLogger';
import * as sinon from "sinon";

describe('ConsoleApp tests', () => {

    let consoleApp: ConsoleApp;
    let loggerInfoSpy: sinon.SinonSpy;

    beforeAll(() => {
        loggerInfoSpy = sinon.spy(ConsoleLogger.prototype, 'info');
        
        consoleApp = new ConsoleApp();
    });

    it('should call the logger', () => {

        consoleApp.run();

        expect(loggerInfoSpy.called).toEqual(true);
    });
});