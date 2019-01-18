export class HelloService {

    public sayHello(_: any, res: any, next: any): any {

        res.json({ message: `Hello from Node.js API v1! process.env.abc = ${process.env.abc}` });

        next();
    }

    public sayHelloSecurely(req: any, res: any, next: any): any {

        res.json({ message: 'Secure response from Node.js API endpoint', user: req.user.name });

        return next();
    }
}