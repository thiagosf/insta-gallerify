import React, { Component } from 'react'
import '../styles/spinner.css'

class Spinner extends Component {
  render () {
    return (
      <div className="spinner">
        <span className="spinner__circle"></span>
      </div>
    )
  }
}

export default Spinner
