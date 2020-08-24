import React from 'react';
import Square from './../Square/Square'
import "./Board.css";

class Board extends React.Component{

    drawBoard(){
        const rows = [];
        for(let i = 0 ; i < 10 ; i++){
            const cells = [];
            const letter = String.fromCharCode( 65 + (i - 1) );
            if( i > 0 && i < 9){ // <-- between first and last line 
                cells.push( this.drawSquares( "Square" , (i * 10 ) , letter ) ) 
                for(let j = 1 ; j < 9 ; j++ ){
                     cells.push( this.drawSquares( ("Square " + ( (i + j) % 2 ? "white" : "black") ) , (i * 10 ) + j ) )
                }
                cells.push( this.drawSquares( "Square" , (i * 10) + 9 , letter ) ) 
            }else{ // <-- first and last line.
                cells.push( this.drawSquares( "Square" , (i * 10 ) ) ) 
                for(let j = 1 ; j < 9 ; j++ ){
                    cells.push( this.drawSquares( "Square" , (i * 10 ) + j , j ) ) ;
                }
                cells.push( this.drawSquares( 'Square' , (i * 10) + 9 ) );
            }
            rows.push(<tr>{cells}</tr>)
        }
        return rows;
    }

    drawSquares(className , position , value = null ){
        const controlMove = this.props.ableMove.indexOf(position) >= 0;

        if(this.props.pieces[position] && controlMove){
            if(className.includes("black") ){
                className = className.replace("black", 'green');
            }else{
                className = className.replace("white", 'green');
            }
        }
        
        return  <Square className={className}
                        key={position}
                        onClick={ () => this.props.onClick(position) }
                        style={ ( this.props.pieces[position] ? this.props.pieces[position].style : 
                                                  controlMove ? { backgroundColor: '#29DA29' } : null
                                ) }
                        value={value}
                />
    }
    
    render(){
        const board = this.drawBoard();
        return(
            <div>
                <table>
                    <tbody>
                        {board}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Board