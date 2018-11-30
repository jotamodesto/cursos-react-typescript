import * as React from 'react';

import './game.css';

export interface ISquareProps {
    value: string;
    onClick: () => void;
}
function Square({value, onClick}: ISquareProps) {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

export interface IProps {
    squares: Array<any>;
    onClick: (i: number) => void;
}
export class Board extends React.Component<IProps, object> {

    public render() {
        return (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
      }

    private renderSquare(i: number) {
        return (
            <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
}

export default Board;