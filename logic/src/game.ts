
export interface IMove {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    beatX?: number;
    beatY?: number;
    successiveMoves?: IMove[]
}

export class Piece {
    king = false;

    constructor(public color: Color) { }
}

export enum VALIDATION_RESULT {
    OK,
    INVALID_ORIGIN,
    INVALID_TARGET,
}

export enum Color {
    LIGHT,
    DARK,
}

export default class Game {

    board: Piece[][];
    moves: IMove[];

    currentPlayer = Color.LIGHT;

    constructor(game?: { board: Piece[][], moves: IMove[], currentPlayer: Color }) {
        if (game) {
            this.board = game.board;
            this.moves = game.moves;
            this.currentPlayer = game.currentPlayer;
        } else {
            this.init();
        }
    }

    private init() {
        this.board = [
            [
                new Piece(Color.LIGHT), null, new Piece(Color.LIGHT), null,
                new Piece(Color.LIGHT), null, new Piece(Color.LIGHT), null
            ],
            [
                null, new Piece(Color.LIGHT), null, new Piece(Color.LIGHT),
                null, new Piece(Color.LIGHT), null, new Piece(Color.LIGHT)
            ],
            [
                new Piece(Color.LIGHT), null, new Piece(Color.LIGHT), null,
                new Piece(Color.LIGHT), null, new Piece(Color.LIGHT), null
            ],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [
                new Piece(Color.DARK), null, new Piece(Color.DARK), null,
                new Piece(Color.DARK), null, new Piece(Color.DARK), null,
            ],
            [
                null, new Piece(Color.DARK), null, new Piece(Color.DARK),
                null, new Piece(Color.DARK), null, new Piece(Color.DARK),
            ],
            [
                new Piece(Color.DARK), null, new Piece(Color.DARK), null,
                new Piece(Color.DARK), null, new Piece(Color.DARK), null,
            ],
        ]
    }

    public validate(move: IMove): VALIDATION_RESULT {
        const piece = this.board[move.fromY][move.fromX];

        // Validate Origin
        if (!piece) {
            return VALIDATION_RESULT.INVALID_ORIGIN;
        }

        // Validate Target
        const targets = this.getPossibleMoves(move.fromX, move.fromY, piece.color, piece.king);
        if (targets.beats && targets.beats.some(b => b.toX === move.toX && b.toY === move.toY)) {
            return VALIDATION_RESULT.OK;
        } else if (targets.moves && targets.moves.some(m => m.toX === move.toX && m.toY === move.toY)) {
            return VALIDATION_RESULT.OK;
        }

        return VALIDATION_RESULT.INVALID_TARGET;
    }

    /**
     * Checks all possible moves for a given piece from the provided position.
     * @param x x origin
     * @param y y origin
     * @param color color to check
     * @param isKing check for king moves
     */
    public getPossibleMoves(x: number, y: number, color: Color, isKing = false): { moves: IMove[], beats: IMove[] } {
        const ul = this.checkDirection(x, y, -1, 1, color, isKing);
        const ur = this.checkDirection(x, y, 1, 1, color, isKing);
        const ll = this.checkDirection(x, y, -1, -1, color, isKing);
        const lr = this.checkDirection(x, y, 1, -1, color, isKing);
        
        return {
            moves: ul.moves.concat(ur.moves, ll.moves, lr.moves),
            beats: ul.beats.concat(ur.beats, ll.beats, lr.beats),
        }
        
    }

    /**
     * 
     * @param x x origin
     * @param y y origin
     * @param xDirection x step size and direction
     * @param yDirection y step size and direction
     * @param color color to check
     * @param isKing check for king moves
     */
    private checkDirection(x: number, y: number, xDirection: number, yDirection: number,
        color: Color, isKing = false) {
        const moves: IMove[] = [], beats: IMove[] = [];

        for (let i = 1; y + i * yDirection >= 0 && this.board.length > y + i * yDirection &&
            x + i * xDirection >= 0 && this.board[y].length > x + i * xDirection; i++) {
            const nextPiece = this.board[y + i * yDirection][x + i * xDirection];

            if (!nextPiece) {
                moves.push({ fromX: x, fromY: y, toX: x + i * xDirection, toY: y + i * yDirection });
            } else if (nextPiece.color != color) {
                const beatTargets: IMove[] = [];
                for (let j = 2; y + j * yDirection >= 0 && this.board.length > y + j * yDirection &&
                    x + j * xDirection >= 0 && this.board[y].length > x + j * xDirection; j++) {
                    if (!this.board[y + j * yDirection][x + j * xDirection]) {
                        const removedPiece = this.board[y + j * yDirection][x + j * xDirection];
                        this.board[y + j * yDirection][x + j * xDirection] = null;
                        beatTargets.push({
                            fromX: x, fromY: y, toX: x - j, toY: y + j,
                            beatX: x - 1, beatY: y + 1,
                            successiveMoves: this.getPossibleMoves(x - j, y + j, color, isKing).beats
                        });
                        this.board[y + j * yDirection][x + j * xDirection] = removedPiece;
                    } else {
                        break;
                    }

                    if (!isKing) {
                        break;
                    }
                }

                if (beatTargets.some((t) => t.successiveMoves.length > 0)) {
                    beatTargets.filter((t) => t.successiveMoves.length > 0);
                }

                beats.push(...beatTargets);
            }

            if (!isKing) {
                break;
            }
        }

        return { moves, beats };
    }

    public performMove(move: IMove) {
        const validation = this.validate(move);
        if (validation != VALIDATION_RESULT.OK) {
            throw new Error(`Invalid move (${validation})`);
        }
        const piece = this.board[move.fromY][move.fromX];
        this.board[move.fromY][move.fromX] = null;
        this.board[move.toY][move.toX] = piece;
        if (move.successiveMoves) {
            this.board[move.beatY][move.beatX] = null;
        } else {
            this.currentPlayer = this.currentPlayer === Color.LIGHT ? Color.DARK : Color.LIGHT;
        }
    }

    public calculateState(moves: IMove[]) {
        moves.forEach((move) => this.performMove(move));
    }
}
