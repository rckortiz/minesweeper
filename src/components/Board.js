import React, { Component } from 'react'
import axios from 'axios'
// import Cell from './components/cell'

class Board extends Component {
  state = {
    data: [],
    board: [],
    mines: 0,
    state: 'null',
    col: '',
    row: '',
    id: 0,
    difficulty: 0
  }

  // getAPI = () => {
  //   axios({
  //     method: 'post',
  //     url: 'https://minesweeper-api.herokuapp.com/games'
  //   }).then(resp => {
  //     console.log(resp)
  //   })
  // }

  check = (row, col) => {
    console.log(`clicked ${row}, ${col}`)
    axios.post('https://minesweeper-api.herokuapp.com/games/games/{id}/check', {
      row: row,
      col: col
    })
  }

  componentDidMount = async () => {
    const resp = await axios.post('https://minesweeper-api.herokuapp.com/games')
    this.setState({
      data: resp.data,
      board: resp.data.board,
      mines: resp.data.mines,
      state: resp.data.state,
      id: resp.data.id,
      difficulty: resp.data.difficulty
    })
  }

  render() {
    return (
      <>
        <h1>Welcome to Minesweeper</h1>
        <button>reset</button>
        <main>
          <table>
            <tbody>
              {this.state.board.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((col, j) => {
                      return (
                        <td key={j}>
                          <button
                            display={this.state.board[i][j]}
                            onClick={() => this.check(i, j)}
                          >
                            {col}
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </main>
      </>
    )
  }
}

export default Board
