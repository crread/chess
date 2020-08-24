import React from 'react';
import Board from './components/Board/Board';
import RestartButton from './components/RestartButton/RestartButton';
import BoardHelper from './components/Board/BoardHelper';
import Pawn from './components/Pieces/Pawn';
import './Game.css';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: BoardHelper(),
      target: null,
      whiteDeadPieces: [],
      blackDeadPieces: [],
      playerTurn: "white",
    }

    this.errorMessage = "";
    this.blackKing = this.state.squares[15];
    this.whiteKing = this.state.squares[85];
    this.kingMoves = [];

    this.callback = (i, currentSquares = null) => {
      if (currentSquares) {
        if (currentSquares[i])
          return currentSquares[i].player;
        else
          return null;
      }else{
        if(this.state.squares[i]){
          return this.state.squares[i].player;
        }else{
          return null;
        }
      }
    }
  }

  handleClick(i) {

    if(this.errorMessage !== "") this.errorMessage = "";

    if (this.state.target ||
      (this.state.target && ((this.state.squares[i].player === 1 && this.state.playerTurn === "white") || (this.state.squares[i].player === 2 && this.state.playerTurn === "black"))) ||
      (this.state.squares[i] && ((this.state.squares[i].player === 1 && this.state.playerTurn === "white") || (this.state.squares[i].player === 2 && this.state.playerTurn === "black")))) {
      this.pieceManager(i);
    }
  }

  changePlayerTurn() {
    this.setState({
      playerTurn: this.state.playerTurn === "white" ? "black" : "white",
    });
  }

  switchTargetToArray(currentSquares, position) {
    this.state.target.pieceMove(this.callback);
    currentSquares[position] = this.state.target;
    currentSquares[this.state.target.position] = null;
    currentSquares[position].position = position;
    this.setState({
      target: null,
    });
  }

  nextMoveManager(position, currentSquares = null) {
    if (currentSquares === null) {
      const currentKing = this.state.playerTurn === "white" ? this.whiteKing : this.blackKing;
      if (currentKing.mustMove && position !== currentKing.position) {
        console.log("doit déplacer le roi");
      } else {
        const target = this.state.squares[position];
        target.pieceMove(this.callback);
        this.setState({
          target: target,
        })
      }
    } else {
      const ennemyKing = this.state.playerTurn === "white" ? this.blackKing : this.whiteKing;
      currentSquares[position].pieceMove(this.callback);
      if (currentSquares[position].moves.includes(ennemyKing.position)) {
        console.log("Roi doit bouger");
        ennemyKing.mustMove = true;
      } else {
        ennemyKing.mustMove = false;
      }
    }
  }

  controlEnnemyKingIsInDanger(currentSquares, kingNumber) {
    let king = kingNumber === 0 ? this.whiteKing : this.blackKing;
    if (king.mustControlMoves) king.mustControlMoves = !king.mustControlMoves;
    king.pieceMove(this.callback, currentSquares);
    const MOVE_KING_LENGTH = king.moves.length;
    const DIRECTIONS = [-1, 1, -10, 10, -9, 9, -11, 11];
    const wrongMove = [];
    const controlAllDirections = (i) => {
      for (let j = 0; j < 8; j++) {
        let positionControlled = king.moves[i];
        do {
          if ((positionControlled % 10 === 0 || positionControlled % 10 === 9 || positionControlled < 11 || positionControlled > 89)) break;
          if (currentSquares[positionControlled] !== null && currentSquares[positionControlled].player !== king.player) {
            if (currentSquares[positionControlled] instanceof Pawn) {
              const pawnMoves = currentSquares[positionControlled].movePieceToAttack();
              for (let k = 0; k < pawnMoves.length; k++) {
                if (pawnMoves[k] === king.moves[i]) wrongMove.push(king.moves[i]);
              }
              break;
            } else {
              currentSquares[positionControlled].pieceMove(this.callback, currentSquares);
              const pieceControlledMoves = currentSquares[positionControlled].moves;
              if (pieceControlledMoves.includes(king.moves[i])) {
                wrongMove.push(king.moves[i]);
                j = 8;
                break;
              }
            }
          }
          positionControlled += DIRECTIONS[j];
        } while (true);
      }
    };

    for (let i = 0; i < MOVE_KING_LENGTH; i++) {
      controlAllDirections(i);
    }
    king.mustMove = false;
    for (let i = 0; i < 8; i++) {
      let positionControlled = king.position + DIRECTIONS[i];
      do {
        if ((positionControlled % 10 === 0 || positionControlled % 10 === 9 || positionControlled < 11 || positionControlled > 89)) break;
        if (currentSquares[positionControlled] !== null && currentSquares[positionControlled].player !== king.player) {
          if (currentSquares[positionControlled] instanceof Pawn) {
            const pawnMoves = currentSquares[positionControlled].movePieceToAttack();
            for (let k = 0; k < pawnMoves.length; k++) {
              if (pawnMoves[k] === king.position) king.mustMove = true;
            }
            break;
          } else {
            currentSquares[positionControlled].pieceMove(this.callback, currentSquares);
            const pieceControlledMoves = currentSquares[positionControlled].moves;
            if (pieceControlledMoves.includes(king.position)) {
              king.mustMove = true;
              i = 8;
              break;
            }
          }
        }
        if (currentSquares[positionControlled] !== null && currentSquares[positionControlled].player === king.player) break;
        positionControlled += DIRECTIONS[i];
      } while (true);
    }
    if (wrongMove.length > 0) {
      king.moves = king.moves.filter(item => wrongMove.every(item2 => item2 !== item));
      if(king.moves.length === 0 ) console.log("échec et mate");
      king.mustControlMoves = true;
    } else {
      king.mustControlMoves = false;
    }
  }

  pieceManager(position) {
    if ((this.state.squares[position] !== null && this.state.target !== null && this.state.squares[position].player === this.state.target.player) || this.state.squares[position] !== null) {
      this.nextMoveManager(position);
    } else {
      if (this.state.target.moves.includes(position)) {
        const currentSquares = this.state.squares.slice();
        this.switchTargetToArray(currentSquares, position);
        this.changePlayerTurn();
        if (currentSquares[position] instanceof Pawn) {
          if (currentSquares[position].played === false) {
            currentSquares[position].played = !currentSquares[position].played;
          }
        }

        for (let i = 0; i < 2; i++) {
          this.controlEnnemyKingIsInDanger(currentSquares, i);
        }

        this.nextMoveManager(position, currentSquares);
        this.setState({
          squares: currentSquares,
        });
      } else {
        console.log("error");
      }
    }
  }

  restartGame() {
    this.setState({
      squares: BoardHelper(),
      target: null,
      whiteDeadPieces: [],
      blackDeadPieces: [],
      playerTurn: "white",
    })
  }

  render() {
    const moves = this.state.target ? this.state.target.moves : [];
    return (
      <div>
        <div>
          <Board pieces={this.state.squares}
            ableMove={moves}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div>
          <RestartButton onClick={() => this.restartGame()} />
        </div>
      </div>
    );
  }
} 