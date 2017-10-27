import { io } from '../index';
import GameHandler from './game';

io.on('connection', (socket) => {
    console.log('client connected');
    const connection = new Connection(socket);
});

const lobby: SocketIO.Socket[] = [];
const games: { [key: string]: GameHandler } = { };

export default class Connection {
    constructor(private socket: SocketIO.Socket) {
        socket.on('disconnect', () => this.onDisconnect());
        socket.on('join', (id) => this.joinGame(id)); // Join game by id
        socket.on('start', (visible) => this.startGame(visible)); // Create new game or join open lobby
    }

    private onDisconnect() {
        if (lobby.length > 0) {
            if (this.socket.id === lobby[0].id) {
                lobby.shift();
            }
        }
        console.log('disconnected');
    }

    private joinGame(id: string) {
        if (!games.hasOwnProperty(id)) {
            this.socket.emit('notification', 'The requested game does not exist.');
            return this.socket.disconnect();
        }

        const game = games[id];
        if (!games[id].canJoin()) {
            return this.socket.emit('ask-for-spectator');
        }

        game.joinPlayer(this.socket);
    }

    private startGame(visible: boolean = true) {
        if (!visible) {
            console.log('creating new game');
            const newGame = new GameHandler({ socket: this.socket });
            games[newGame.id] = newGame;
            return this.socket.emit('gameid', newGame.id);
        }

        if (lobby.length > 0) {
            console.log('Joining game');
            const newGame = new GameHandler({ socket: lobby.shift() });
            newGame.joinPlayer(this.socket);
            return games[newGame.id] = newGame;
        }

        lobby.push(this.socket);
    }
}
