import Piece from './Piece'

export default class Pawn extends Piece{
    constructor(player, position){
        super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"), position)
        this.played = false;
    }

    pieceMove(callback){
        let moves = this.movePiece();
        let dataFromCallback = null;
        this.moves = [];
        
        for (let i = 0; i < moves.length; i++) {
            dataFromCallback = callback(moves[i]);
          if (dataFromCallback === null)
            this.moves.push(moves[i]);
          else
            break;
        }
        moves = this.movePieceToAttack();
    
        for (let i = 0; i < moves.length; i++) {
            dataFromCallback = callback(moves[i]);
          if (dataFromCallback !== null && dataFromCallback !== this.player)
          this.moves.push(moves[i]);
        }
    }

    movePiece(){
        if( this.player === 1 ){
            if(this.played){
                return [ this.position - 10 ];
            }else{
                return [ this.position - 10,
                         this.position - 20 ];
            }
        }else{
            if(this.played){
                return [ this.position + 10 ];
            }else{
                return [ this.position + 10,
                         this.position + 20 ];
            }
        }
    }

    movePieceToAttack(){
        if(this.player === 1){
            return [ this.position - 9,
                     this.position - 11 ];
        }else{
            return [ this.position + 9,
                     this.position + 11 ];
        }
    }
}