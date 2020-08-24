import Piece from './Piece'

export default class Bishop extends Piece{
    constructor(player, position){
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"), position)
    }

    movePiece(){
        return [ -11 , 11 , -9 , 9 ];
    }
}