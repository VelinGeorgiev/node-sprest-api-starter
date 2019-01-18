import {AuthService} from './AuthService';
import * as sinon from "sinon";
import { DevConfig } from '../DevConfig';
import { ConsoleLogger } from '../ConsoleLogger';

describe('AuthService tests', () => {

  let authService: AuthService;
  let loggerSpy: sinon.SinonSpy;

  const config = new DevConfig();
  const logger = new ConsoleLogger('info');

  beforeAll(() => {
    authService = new AuthService(config, logger);

    loggerSpy = sinon.spy(ConsoleLogger.prototype, 'info');
  });

  it('should validate user', () => {

    const callbackFunc = (a: any, b: any) => { return logger.info(`${a}, ${b}`) };

    authService.verifyUser('abc', callbackFunc);
    
    expect(loggerSpy.calledWith('null, abc')).toEqual(true);
  });
});