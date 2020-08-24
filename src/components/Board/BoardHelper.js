import King from './../Pieces/King';
import Queen from './../Pieces/Queen';
import Pawn from './../Pieces/Pawn';
import Rook from './../Pieces/Rook';
import Knight from './../Pieces/Knight'
import Bishop from './../Pieces/Bishop'

export default function BoardHelper(){

    const pieces = Array(100).fill(null);
    
    for(let i = 21 ; i < 29 ; i++){
        if(i !== 29 || i !== 30){
            pieces[i] = new Pawn(2 , i);
            pieces[i + 50] = new Pawn(1, i + 50);
        }
    }
    
    pieces[11] = new Rook(2 , 11);
    pieces[18] = new Rook(2 , 18);
    pieces[81] = new Rook(1 , 81);
    pieces[88] = new Rook(1 , 88);

    pieces[12] = new Knight(2 , 12);
    pieces[17] = new Knight(2 , 17);
    pieces[82] = new Knight(1 , 82);
    pieces[87] = new Knight(1 , 87);

    pieces[13] = new Bishop(2 , 13);
    pieces[16] = new Bishop(2 , 16);
    pieces[83] = new Bishop(1 , 83);
    pieces[86] = new Bishop(1 , 86);

    pieces[14] = new Queen(2 , 14);
    pieces[84] = new Queen(1 , 84);

    pieces[15] = new King(2 , 15);
    pieces[85] = new King(1 , 85);

    return pieces;
}