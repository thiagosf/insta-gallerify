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
        {images.length === 0 &&
          <p className="app__start-message">Fill the username <span role="img">☝️</span></p>
        }
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
