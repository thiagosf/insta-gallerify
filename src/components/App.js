import React, { Component } from 'react'
import Header from './Header'
import Gallery from './Gallery'
import api from '../utils/api'

class App extends Component {
  state = {
    images: []
  };

  render () {
    const { images } = this.state
    return (
      <div className="app">
        <Header
          onSetUsername={this._onSetUsername}
        />
        <Gallery images={images} />
      </div>
    )
  };

  _onSetUsername = username => {
    return api.fetchUser(username).then(images => {
      this.setState({ images })
    })
  };
}

export default App
