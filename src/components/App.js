import React, { Component } from 'react'
import Header from './Header'
import Gallery from './Gallery'
import GalleryFilters from './GalleryFilters'
import { api, imageUtils } from '../utils'
import '../styles/app.css'

class App extends Component {
  state = {
    images: [],
    filters: {},
    favorites: [],
    showThumbs: false
  };

  render () {
    const { images } = this.state
    return (
      <div className="app">
        <Header
          onSetUsername={this._onSetUsername}
        />
        <GalleryFilters
          filters={this.state.filters}
          onChange={this._onFilter}
        />
        <Gallery images={this._galleryImages()} />
        {images.length === 0 &&
          <p className="app__start-message">Fill the username <span role="img" aria-label="point_up">☝️</span></p>
        }
      </div>
    )
  };

  _onSetUsername = username => {
    return api.fetchUser(username).then(images => {
      this.setState({ images })
    })
  };

  _galleryImages = () => {
    let list = []
    const { images, filters } = this.state
    if (images.length > 0) {
      list = imageUtils.filterImages({ images, ...filters })
    }
    return list
  };

  _onFilter = filters => {
    console.log('filters', filters)
    this.setState({ filters })
  };
}

export default App
