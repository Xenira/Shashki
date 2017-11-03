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

export enum ValidationResult {
    OK,
    INVALID_ORIGIN,
    INVALID_TARGET,
    INVALID_REQUEST
}

export enum Color {
    LIGHT,
    DARK,
}

export enum EndResult {
    DRAW,
    VICTORY,
    DEFEAT
}

export default class Game {

    board: Piece[][];
    moves: IMove[];
    moveTexts: string[] = [];

    currentPlayer = Color.LIGHT;
    hasEnded = false;
    winner: Color = null;

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

    public validate(move: IMove): ValidationResult {
        if (!move.hasOwnProperty('fromY') || move.fromY < 0 || this.board.length <= move.fromY ||
            !move.hasOwnProperty('toY') || move.toY < 0 || this.board.length <= move.toY ||
            !move.hasOwnProperty('fromX') || move.fromY < 0 || this.board[move.fromY].length <= move.fromX ||
            !move.hasOwnProperty('toX') || move.toX < 0 || this.board[move.toY].length <= move.toX) {
            console.log(move);
            return ValidationResult.INVALID_REQUEST;
        }
        const piece = this.board[move.fromY][move.fromX];

        // Validate Origin
        if (!piece) {
            return ValidationResult.INVALID_ORIGIN;
        }

        // Validate Target
        const targets = this.getPossibleMoves(move.fromX, move.fromY, piece.color, piece.king);
        console.log(move, piece, targets);
        if (targets.beats.length > 0 && targets.beats.some(b => b.toX === move.toX && b.toY === move.toY)) {
            return ValidationResult.OK;
        } else if (targets.beats.length === 0 && targets.moves.length > 0 && targets.moves.some(m => m.toX === move.toX && m.toY === move.toY)) {
            return ValidationResult.OK;
        }

        return ValidationResult.INVALID_TARGET;
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
        const result = { moves: [], beats: [] };
        const ul = this.checkDirection(x, y, -1, 1, color, isKing);
        const ur = this.checkDirection(x, y, 1, 1, color, isKing);
        const ll = this.checkDirection(x, y, -1, -1, color, isKing);
        const lr = this.checkDirection(x, y, 1, -1, color, isKing);
        result.beats.push(...ul.beats, ...ur.beats, ...ll.beats, ...lr.beats);

        if (color === Color.DARK || isKing) {
            result.moves.push(...ul.moves, ...ur.moves);
        }
        if (color === Color.LIGHT || isKing) {
            result.moves.push(...ll.moves, ...lr.moves);
        }

        return result;
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
                for (let j = i + 1; y + j * yDirection >= 0 && this.board.length > y + j * yDirection &&
                    x + j * xDirection >= 0 && this.board[y].length > x + j * xDirection; j++) {
                    const xTarget = x + j * xDirection;
                    const yTarget = y + j * yDirection;

                    if (!this.board[yTarget][xTarget]) {
                        const xBeat = x + i * xDirection
                        const yBeat = y + i * yDirection
                        const removedPiece = this.board[yBeat][xBeat];
                        this.board[yBeat][xBeat] = null;

                        const becomesKing = (color === Color.LIGHT && yTarget === 0) ||
                            (color === Color.DARK && yTarget === this.board.length - 1);
                        beatTargets.push({
                            fromX: x, fromY: y, toX: xTarget, toY: yTarget,
                            beatX: xBeat, beatY: yBeat,
                            successiveMoves: this.getPossibleMoves(xTarget, yTarget, color, isKing || becomesKing).beats
                        });

                        this.board[yBeat][xBeat] = removedPiece;
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
            } else {
                break;
            }

            if (!isKing) {
                break;
            }
        }

        return { moves, beats };
    }

    public performMove(move: IMove) {
        const piece = this.board[move.fromY][move.fromX];
        this.board[move.fromY][move.fromX] = null;

        if ((piece.color === Color.LIGHT && move.toY === 0) ||
            (piece.color === Color.DARK && move.toY === this.board.length - 1)) {
                piece.king = true;
        }

        this.board[move.toY][move.toX] = piece;
        if (move.hasOwnProperty('beatX')) {
            this.board[move.beatY][move.beatX] = null;
        }

        if (this.moveTexts.length % 2 === this.currentPlayer) {
            this.moveTexts.push(String.fromCharCode(65 + move.fromX) + (this.board.length - move.fromY)
                + (move.hasOwnProperty('beatX') ? ':' : '-') + String.fromCharCode(65 + move.toX)
                + (this.board.length - move.toY) );
        } else {
            this.moveTexts[this.moveTexts.length - 1] +=
                `:${String.fromCharCode(65 + move.toX)}${this.board.length - move.toY}`;
        }

        if (!move.successiveMoves || move.successiveMoves.length === 0) {
            this.currentPlayer = this.currentPlayer === Color.LIGHT ? Color.DARK : Color.LIGHT;
        }
        if (piece.color !==  this.currentPlayer) {
            const moves = this.getPlayerMoves(this.currentPlayer);
            if (moves.beats.length === 0 && moves.moves.length === 0) {
                this.hasEnded = true;
                this.winner = piece.color;
            }
        }
    }

    public calculateState(moves: IMove[]) {
        moves.forEach((move) => this.performMove(move));
    }
}
