import * as dbg from 'debug';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as socketIO from 'socket.io';
import app from './app';
import Connection from './sockets/connection';

console.log('Starting server');

const debug = dbg('Backend:server');
let server;

if (app.get('env') === 'development') {
    console.log('Using HTTP for dev environment');
    server = http.createServer(app);
} else {
    const options: any = {
        pfx: fs.readFileSync(__dirname + `/../sslcert/${process.env.CERT_NAME || 'cert.pfx'}`),
    };
    if (process.env.CERT_PASSWORD) {
        options.passphrase = process.env.CERT_PASSWORD;
    }

    server = https.createServer(options, app);
}

/**
 * Get port from environment and store in Express.
 */

const serverPort = normalizePort(process.env.PORT || '3000');
app.set('port', serverPort);
console.log('Port: ' + serverPort);

/**
 * Create HTTP server.
 */

debug('Starting socket server');
export const io = socketIO(server);
import './sockets/connection';

/**
 * Listen on provided port, on all network interfaces.
 */

debug('Starting rest server');
server.on('error', onError);
server.on('listening', onListening);
server.listen(serverPort);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof serverPort === 'string'
        ? 'Pipe ' + serverPort
        : 'Port ' + serverPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
