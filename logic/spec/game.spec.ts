import Game from './../src/game';
import { IMove, VALIDATION_RESULT } from '../src/game';

describe('Game class', () => {
    let game: Game;
    beforeEach(() => {
        game = new Game();
    });

    describe('#validate', () => {
        it('should detect valid Men move', () => {
            const moveUR = game.validate({ fromX: 4, fromY: 2, toX: 5, toY: 3 }); // e3-f4
            const moveUL = game.validate({ fromX: 4, fromY: 2, toX: 3, toY: 3 }); // e3-d4
            expect(moveUR).toBe(VALIDATION_RESULT.OK);
            expect(moveUL).toBe(VALIDATION_RESULT.OK);

            game.performMove({ fromX: 4, fromY: 2, toX: 5, toY: 3 }); // e3-f4
            const moveLR = game.validate({ fromX: 3, fromY: 5, toX: 4, toY: 4 }); // d6-e5
            const moveLL = game.validate({ fromX: 3, fromY: 5, toX: 2, toY: 4 }); // d6-c5
            expect(moveLR).toBe(VALIDATION_RESULT.OK);
            expect(moveLL).toBe(VALIDATION_RESULT.OK);
        });
        it('should detect invalid move direction', () => {
            const moveUp = game.validate({ fromX: 5, fromY: 3, toX: 5, toY: 4 }); // e3-e4

            expect(moveUp).toBe(VALIDATION_RESULT.INVALID_TARGET);
        });
        it('should detect an empty origin', () => {
            const result = game.validate({ fromX: 0, fromY: 1, toX: 1, toY: 2 });
            expect(result).toBe(VALIDATION_RESULT.INVALID_ORIGIN);
        });
        it('should detect out of bounce', () => {
        });
    });

    describe('#getValidMoves', () => {
        it('should give', () => {
            
        });
    });
});
