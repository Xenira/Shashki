import * as shortid from 'shortid';
import Game, { Color, IMove, ValidationResult } from '../../../logic/src/game';
import { io } from '../index';
import { removeGame } from './connection';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

interface IPlayer {
    socket: SocketIO.Socket;
    color?: Color;
}

export default class GameHandler {
    public id = shortid.generate();

    private spectators: SocketIO.Socket[] = [];
    private player2: IPlayer;
    private game = new Game();

    private turnStarted: number;
    private rematchRequested = false;

    constructor(private player1: IPlayer) {
        this.addListeners(player1.socket);
        player1.socket.join(this.id);
    }

    public canJoin(): boolean {
        return !this.player2;
    }

    public joinSpectator(spectator: SocketIO.Socket) {
        this.spectators.push(spectator);
        spectator.join(this.id);
    }

    public joinPlayer(player2: SocketIO.Socket) {
        if (!this.player2) {
            this.player2 = { socket: player2 };
            this.addListeners(player2);
            return this.player2.socket.join(this.id, () => this.startGame());
        }

        player2.emit('game-full');
        player2.disconnect();
    }

    public disconnected(id: string) {
        this.game.hasEnded = true;
        removeGame(this.id);

        if (this.player1.socket.id === id && this.player2 && this.player2.socket) {
            this.player2.socket.emit('notification', 'Your opponent disconnected.');
            this.player2.socket.disconnect();
            return;
        }
        this.player1.socket.emit('notification', 'Your opponent disconnected.');
        this.player1.socket.disconnect();
    }

    private startGame() {
        this.player1.color = Math.random() > 0.5 ? Color.LIGHT : Color.DARK;
        this.player2.color = this.player1.color === Color.LIGHT ? Color.DARK : Color.LIGHT;
        this.player1.socket.emit('start', this.player1.color, this.id);
        this.player2.socket.emit('start', this.player2.color, this.id);

        this.player1.socket.emit('notification', `You are ${this.player1.color === Color.LIGHT ? 'light' : 'dark'}`);
        this.player2.socket.emit('notification', `You are ${this.player2.color === Color.LIGHT ? 'light' : 'dark'}`);
        this.spectators.forEach((spec) => spec.emit('notification', 'The game is starting'));
    }

    private makeMove(id: string, move: IMove) {
        console.log(move);
        if (this.player1.socket.id === id && this.game.currentPlayer !== this.player1.color) {
            return this.player1.socket.emit('notification', 'It\'s Player2\'s turn.');
        } else if (this.player2.socket.id === id && this.game.currentPlayer !== this.player2.color) {
            return this.player1.socket.emit('notification', 'It\'s Player1\'s turn.');
        }

        const res = this.game.validate(move);
        switch (res) {
            case ValidationResult.OK:
                this.game.performMove(move);
                io.to(this.id).emit('move', move);
                break;
            default:
                this.player1.socket.id === id
                    ? this.player1.socket.emit('notification', `That move is not possible. (${res})`)
                    : this.player2.socket.emit('notification', `That move is not possible. (${res})`);
                break;
        }
    }

    private startRematch() {
        this.player1.color = this.game.winner === this.player1.color ? Color.DARK : Color.LIGHT;
        this.player2.color = this.player1.color === Color.LIGHT ? Color.DARK : Color.LIGHT;
        this.player1.socket.emit('start', this.player1.color, this.id);
        this.player2.socket.emit('start', this.player2.color, this.id);
        this.game = new Game();

        this.player1.socket.emit('notification', `You are ${this.player1.color === Color.LIGHT ? 'light' : 'dark'}`);
        this.player2.socket.emit('notification', `You are ${this.player2.color === Color.LIGHT ? 'light' : 'dark'}`);
        this.spectators.forEach((spec) => spec.emit('notification', 'The game is starting'));
    }

    private addListeners(socket: SocketIO.Socket) {
        socket.on('move', (move) => this.makeMove(socket.id, move));
        socket.on('rematch', () => {
            if (!this.game.hasEnded) {
                return socket.emit('notification', 'Cant request rematch while game is running');
            }
            if (this.rematchRequested) {
                this.rematchRequested = false;
                this.startRematch();
            }
            this.rematchRequested = true;
        });
    }

}
