'use strict';

const Hapi = require('hapi');
const status = require('hapi-status');

const server = new Hapi.Server();
server.connection({ port: 3000 });

    server.route({
    method: 'GET',
    path: '/project/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.route({
    method: 'GET',
    path: '/project/{id}',
    handler: function (request, reply) {
        switch (request.params.id) {
            case '1':
                reply({
                    id: 1,
                    user_id: 1,
                    parts: [1, 2, 3]
                });
                break;
            case '2':
                reply({
                    id: 2,
                    user_id: 2,
                    parts: [4, 2, 6, 5]
                });
                break;
            case '3':
                reply({
                    id: 3,
                    user_id: 3,
                    parts: [4]
                });
                break;
            default:
                return status.notFound(reply);
        }
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});