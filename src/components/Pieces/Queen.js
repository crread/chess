import Piece from './Piece'

export default class Queen extends Piece{
    constructor(player, position){
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"), position)
    }

    movePiece(){
        return [ -11 , 
                  11 , 
                  -9 , 
                   9 , 
                 -10 , 
                  10 , 
                  -1 , 
                   1 ];
    }
}