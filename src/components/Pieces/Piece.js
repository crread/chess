export default class piece {
    constructor(player, url, position) {
        this.player = player;
        this.style = { backgroundImage: "url('" + url + "')" };
        this.position = position;
        this.moves = [];
    }

    pieceMove(callback, currentSquares = null) {
        const moves = this.movePiece();
        let counter = 0;
        let dataFromCallback = null;
        this.moves = [];
        for (let i = 0; i < moves.length; i++) {
            counter = this.position + moves[i];
            do {
                if ((counter % 10 === 0 || counter % 10 === 9 || counter < 11 || counter > 89)) break;
                dataFromCallback = currentSquares === null ? callback(counter) : callback(counter , currentSquares);
                if (dataFromCallback === null || dataFromCallback !== this.player) {
                    this.moves.push(counter);
                    if (dataFromCallback !== null) break;
                    counter += moves[i];
                } else{
                    break;
                }
            } while (true);
        }
    }
}