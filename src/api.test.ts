// tslint:disable:import-name
import * as request from 'supertest';
import { IConfig } from './IConfig';
import { ILogger } from './ILogger';
import { ConsoleLogger } from './ConsoleLogger';
import { DevConfig } from './DevConfig';
import { HelloService } from './services/HelloService';
import { AuthService } from './services/AuthService';
import { Api } from './api';
import { BearerStrategy } from "passport-azure-ad";
import * as sinon from 'sinon';
import * as passport from "passport";

const logger: ILogger = new ConsoleLogger('info');
const config: IConfig = new DevConfig();

const helloService: HelloService = new HelloService();
const authService: AuthService = new AuthService(config, logger);

const api = new Api(helloService, authService, logger);
const server = api.createServer();

describe('Api e2e tests', () => {

  let requestServer: any;

  beforeAll(() => {

    requestServer = request(server);


    //const strategy = sinon.stub().yields('token-abc');
    //strategy(BearerStrategy);
    //Object.setPrototypeOf(BearerStrategy, strategy);

    //strategy.invokeCallback();
  });

  afterAll(() => {

    server.close();


    //const strategy = sinon.stub().yields('token-abc');
    //strategy(BearerStrategy);
    //Object.setPrototypeOf(BearerStrategy, strategy);

    //strategy.invokeCallback();
  });

  // it('should the api successfully call "/"', (done: any) => {

  //   requestServer.get('/').then((res: any) => {

  //     expect(res.status).toEqual(200);
  //     done();
  //   });
  // });

  // it('should api fail for /api/secured when no token', (done: any) => {

  //   requestServer.get('/api/secured').then((res: any) => {

  //     expect(res.status).toEqual(401);
  //     done();
  //   });
  // });

  it('should api successfully call /api/secured when token present', (done: any) => {

    //let authenticate = sinon.stub(passport, 'authenticate').returns(() => { });
    //authenticate.yields(null, { token: 'abc' });
    //authenticate.yields(new Error('fails here'));


    // sinon.stub(passport, "authenticate").callsFake((_strategy, _options, callback) => {
    //   callback(null, { "username": "test@techbrij.com" }, null);
    //   return (_req, _res, _next) => { };
    // });
    let authenticate = sinon.stub(passport, 'authenticate').returns(() => {});
    // let serialize = sinon.stub(passport, 'serializeUser').returns(() => {});
    // let deserialize = sinon.stub(passport, 'deserializeUser').returns(() => {});

    let strategy = sinon.stub(BearerStrategy.prototype, 'jwtVerify');

    strategy.yields(null, true, '', ()=>{});
    authenticate.yields(null, true);

    requestServer.get('/api/secured')
      .set('Authorization', 'Bearer abc')
      .end((err, res) => {

        if (err) {
          console.log(err);
        }

        console.log(JSON.stringify(res));

        expect(res.status).toEqual(200);
        done();
      });
  });
});