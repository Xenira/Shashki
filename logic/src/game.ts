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
    INVALID_REQUEST
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
                null, new Piece(Color.DARK), null, new Piece(Color.DARK),
                null, new Piece(Color.DARK), null, new Piece(Color.DARK),
            ],
            [
                new Piece(Color.DARK), null, new Piece(Color.DARK), null,
                new Piece(Color.DARK), null, new Piece(Color.DARK), null,
            ],
            [
                null, new Piece(Color.DARK), null, new Piece(Color.DARK),
                null, new Piece(Color.DARK), null, new Piece(Color.DARK),
            ],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
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
        ]
    }

    public validate(move: IMove): VALIDATION_RESULT {
        if (!move.fromY || this.board.length <= move.fromY ||
            !move.fromX || this.board[move.fromY].length <= move.fromX) {
                console.log(move);
                return VALIDATION_RESULT.INVALID_REQUEST;
        }
        const piece = this.board[move.fromY][move.fromX];

        // Validate Origin
        if (!piece) {
            return VALIDATION_RESULT.INVALID_ORIGIN;
        }

        // Validate Target
        const targets = this.getPossibleMoves(move.fromX, move.fromY, piece.color, piece.king);
        console.log(move, piece, targets);
        if (targets.beats.length > 0 && targets.beats.some(b => b.toX === move.toX && b.toY === move.toY)) {
            return VALIDATION_RESULT.OK;
        } else if (targets.moves.length > 0 && targets.moves.some(m => m.toX === move.toX && m.toY === move.toY)) {
            return VALIDATION_RESULT.OK;
        }

        return VALIDATION_RESULT.INVALID_TARGET;
    }

    public getPlayerMoves(color: Color) {
        const moves: { moves: IMove[], beats: IMove[] } = { moves: [], beats: [] };
        if (this.currentPlayer !== color) {
            return moves;
        }
        if (this.moves && this.moves.length > 0 &&
            this.moves[this.moves.length - 1].successiveMoves) {
            return { moves: [], beats: this.moves[this.moves.length - 1].successiveMoves };
        }
        this.board.forEach((row, y) => {
            const results = row
                .map((piece, x) => {
                    return (piece && piece.color === color) &&
                        this.getPossibleMoves(x, y, color, piece.king);
                })
                .filter(moves => moves)
            results.forEach((r) => {
                moves.moves.push(...r.moves)
                moves.beats.push(...r.beats)
            })
        });

        return moves;
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
            } else if (nextPiece.color !== color) {
                // TODO: Put this into an pitier function
                let beatTargets: IMove[] = [];
                for (let j = 2; y + j * yDirection >= 0 && this.board.length > y + j * yDirection &&
                    x + j * xDirection >= 0 && this.board[y].length > x + j * xDirection; j++) {
                        const xTarget = x + j * xDirection;
                        const yTarget = y + j * yDirection;
                    if (!this.board[yTarget][xTarget]) {
                        const removedPiece = this.board[yTarget][xTarget];
                        this.board[yTarget][xTarget] = null;
                        beatTargets.push({
                            fromX: x, fromY: y, toX: xTarget, toY: yTarget,
                            beatX: x + xDirection, beatY: y + yDirection,
                            successiveMoves: this.getPossibleMoves(xTarget, yTarget, color, isKing).beats
                        });
                        this.board[yTarget][xTarget] = removedPiece;
                    } else {
                        break;
                    }

                    if (!isKing) {
                        break;
                    }
                }

                if (beatTargets.some((t) => t.successiveMoves.length > 0)) {
                    beatTargets = beatTargets.filter((t) => t.successiveMoves.length > 0);
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
        if (move.beatX) {
            this.board[move.beatY][move.beatX] = null;
        }
        if (move.successiveMoves) {
            this.currentPlayer = this.currentPlayer === Color.LIGHT ? Color.DARK : Color.LIGHT;
        }
    }

    public calculateState(moves: IMove[]) {
        moves.forEach((move) => this.performMove(move));
    }
}
