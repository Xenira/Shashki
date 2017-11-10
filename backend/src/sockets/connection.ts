import { io } from '../index';
import GameHandler from './game';

io.on('connection', (socket) => {
    console.log('client connected');
    const connection = new Connection(socket);
});

let lobby: GameHandler;
const games: { [key: string]: GameHandler } = { };

export const removeGame = (key: string) => {
    delete games[key];
};

export default class Connection {
    private game: GameHandler;
    constructor(private socket: SocketIO.Socket) {
        socket.on('disconnect', () => this.onDisconnect());
        socket.on('join', (id) => this.joinGame(id)); // Join game by id
        socket.on('start', (visible) => this.startGame(visible)); // Create new game or join open lobby
    }

    private onDisconnect() {
        if (this.game) {
            this.game.disconnected(this.socket.id);
            if (lobby === this.game) {
                lobby = undefined;
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
        this.game = game;
    }

    private startGame(visible: boolean = true) {
        if (!visible) {
            console.log('creating new game');
            const newGame = new GameHandler({ socket: this.socket });
            games[newGame.id] = newGame;
            this.game = newGame;
            return this.socket.emit('gameid', newGame.id);
        }

        if (lobby) {
            console.log('Joining game');
            lobby.joinPlayer(this.socket);
            this.game = lobby;
            games[lobby.id] = lobby;
            return lobby = null;
        }

        lobby = new GameHandler({ socket: this.socket });
        this.game = lobby;
    }
}
