import React, { Component } from 'react'
import axios from 'axios'

class Board extends Component {
  state = {
    board: [],
    mines: 0,
    state: 'null',
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

  check = (x, y) => {
    console.log(`clicked ${x}, ${y}`)
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
        <button onClick={this.reset}>reset</button>
        <main>
          <table>
            <tbody>
              {this.state.board.map(row => {
                return (
                  <tr>
                    {row.map(col => {
                      return (
                        <td>
                          <button>{col}</button>
                        </td>
                      )
                    })}
                    <td />
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
