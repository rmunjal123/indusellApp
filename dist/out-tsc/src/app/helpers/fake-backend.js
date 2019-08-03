import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
export function fakeBackendFactory(backend, options) {
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';
    backend.connections.subscribe(function (connection) {
        // We are using the setTimeout() function to simulate an asynchronous call 
        // to the server that takes 1 second. 
        setTimeout(function () {
            //
            // Fake implementation of /api/authenticate
            //
            if (connection.request.url.endsWith('/api/authenticate') &&
                connection.request.method === RequestMethod.Post) {
                var body = JSON.parse(connection.request.getBody());
                console.log(body.email, body.password);
                if (body.email === 'mosh@domain.com' && body.password === 'Qwe1234') {
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: { token: token }
                    })));
                }
                else {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }
            }
            // 
            // Fake implementation of /api/orders
            //
            if (connection.request.url.endsWith('/api/orders') && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: [1, 2, 3] })));
                }
                else {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
            }
        }, 1000);
    });
    return new Http(backend, options);
}
export var fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
//# sourceMappingURL=fake-backend.js.map