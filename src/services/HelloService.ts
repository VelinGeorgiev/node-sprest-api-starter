export class HelloService {

    public sayHello(_: any, res: any, next: any): any {

        res.json({ message: `Hello from Node.js API v1! Setting works>? = ${process.env.abc}` });

        next();
    }

    public secured(_: any, res: any, next: any): any {

        //console.log(res);
        res.json({ message: 'Secure response from Node.js API endpoint' });

        return next();
    }
}