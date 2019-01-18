// tslint:disable:import-name
import * as request from 'supertest';
import { IConfig } from './IConfig';
import { ILogger } from './ILogger';
import { ConsoleLogger } from './ConsoleLogger';
import { DevConfig } from './DevConfig';
import { HelloService } from './services/HelloService';
import { AuthService } from './services/AuthService';
import { Api } from './api';

const logger: ILogger = new ConsoleLogger('info');
const config: IConfig = new DevConfig();

const helloService: HelloService = new HelloService();
const authService: AuthService = new AuthService(config, logger);

const api = new Api(helloService, authService, logger);
const server = api.createServer();

describe('Node.js API tests', () => {

  it('server successfully calls "/" path', (done: any) => {

    request(server).get('/').then((res: any) => {

      expect(res.status).toEqual(200);
      done();
    });
  });

  // it('greets a user with message', (done: any) => {
  //   const authenticatedRequest = request.agent();

  //   authenticatedRequest
  //     .post('')
  //     .send()
  //     .end();

  //     request(server).get('/').then((res: any) => {

  //       expect(res.status).toEqual(200);
  //       done();
  //     });
  // });

  // it('greets a user with message 1', () => {
  //   expect(1).toBe(1);
  // });
});