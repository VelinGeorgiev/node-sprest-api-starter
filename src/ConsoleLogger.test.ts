import { ConsoleLogger } from './ConsoleLogger';
import * as sinon from "sinon";

describe('ConsoleApp tests', () => {

    let logger: ConsoleLogger;
    let loggerInfoSpy: sinon.SinonSpy;
    let loggerWarnSpy: sinon.SinonSpy;
    let loggerErrSpy: sinon.SinonSpy;

    beforeAll(() => {
        loggerInfoSpy = sinon.spy(ConsoleLogger.prototype, 'info');
        loggerWarnSpy = sinon.spy(ConsoleLogger.prototype, 'warn');
        loggerErrSpy = sinon.spy(ConsoleLogger.prototype, 'error');
        
        logger = new ConsoleLogger('info');
    });

    afterAll(() => {
        loggerInfoSpy.restore();
        loggerWarnSpy.restore();
        loggerErrSpy.restore();
    })

    it('should call the logger.info with the correct message', () => {

        logger.info('info 1');

        expect(loggerInfoSpy.calledWith('info 1')).toEqual(true);
    });

    it('should call the logger.warn with the correct message', () => {

        logger.warn('warn 1');

        expect(loggerWarnSpy.calledWith('warn 1')).toEqual(true);
    });

    it('should call the logger.error with the correct message', () => {

        logger.error('error 1');

        expect(loggerErrSpy.calledWith('error 1')).toEqual(true);
    });

    it('should not call the logger.info if logging level not set to info', () => {
        
        logger = new ConsoleLogger('');

        const consoleSpy = sinon.spy(console, 'log');

        logger.info('error 1');

        expect(consoleSpy.notCalled).toEqual(true);

        consoleSpy.restore();
    });
});