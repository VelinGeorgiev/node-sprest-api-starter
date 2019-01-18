import * as request from 'supertest';
import { BearerStrategy } from "passport-azure-ad";
import server from './main';
import * as sinon from "sinon";
//import * as passport from "passport";

describe('main e2e tests', () => {

  let requestServer: any;

  beforeAll(() => {
    requestServer = request(server);
  });

  afterAll(() => {

    server.close();
  });

  it('should the api successfully call "/"', (done: any) => {

    requestServer.get('/').then((res: any) => {

      expect(res.status).toEqual(200);
      done();
    });
  });

  it('should api fail for /api/secured when no token', (done: any) => {

    requestServer.get('/api/secured').then((res: any) => {

      expect(res.status).toEqual(401);
      done();
    });
  });

  it('should api successfully call /api/secured when token present', (done: any) => {
    // const authenticate = sinon.stub(passport, 'authenticate').returns(() => { });
    // authenticate.yields();
    // let serialize = sinon.stub(passport, 'serializeUser').returns(() => {});
    // let deserialize = sinon.stub(passport, 'deserializeUser').returns(() => {});

    sinon.stub(BearerStrategy.prototype, 'jwtVerify').yields(null, true, '', () => { });;
    
    requestServer.get('/api/secured')
      .set('Authorization', 'Bearer abc')
      .end((err: any, res: any) => {

        if (err) {
          console.log(err);
        }

        expect(res.status).toEqual(200);
        done();
      });
  });
});