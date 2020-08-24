import Piece from './Piece'

export default class King extends Piece {
    constructor(player, position) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"), position);
        this.mustControlMoves = false;
        this.mustMove = false;
    }

    pieceMove(callback , currentSquares) {
        if(!this.mustControlMoves){
            const moves = this.movePiece();
            let dataFromCallback = null;
            this.moves = [];
    
            for (let i = 0; i < moves.length; i++) {
                dataFromCallback = callback(moves[i] , currentSquares);
                if ((moves[i] % 10 > 0 && moves[i] % 10 < 9 && moves[i] > 11 && moves[i] < 89) &&
                    (dataFromCallback === null || (dataFromCallback !== null && dataFromCallback !== this.player))) {
                    this.moves.push(moves[i]);
                }
            }
        }
    }

    movePiece() {
        return [
            this.position - 1,
            this.position + 1,
            this.position - 10,
            this.position + 10,
            this.position - 9,
            this.position + 9,
            this.position - 11,
            this.position + 11
        ];
    }
}