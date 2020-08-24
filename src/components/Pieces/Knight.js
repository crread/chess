import Piece from './Piece'

export default class Knight extends Piece {
    constructor(player, position) {
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"), position)
    }

    pieceMove(callback) {
        const moves = this.movePiece();
        let dataFromCallback = null;
        this.moves = [];
        for (let i = 0; i < moves.length; i++) {
            dataFromCallback = callback(moves[i]);
            if ((moves[i] % 10 > 0 && moves[i] % 10 < 9 && moves[i] > 11 && moves[i] < 89) &&
                (dataFromCallback === null || (dataFromCallback !== null && dataFromCallback !== this.player))) {
                this.moves.push(moves[i]);
            }
        }
    }

    movePiece() {
        return [
            this.position + 21,
            this.position + 19,
            this.position + 12,
            this.position + 8,
            this.position - 21,
            this.position - 19,
            this.position - 12,
            this.position - 8
        ];
    }
}