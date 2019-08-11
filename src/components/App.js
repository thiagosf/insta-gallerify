import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Gallery from './Gallery'
import GalleryFilters from './GalleryFilters'
import Spinner from './Spinner'
import { api, imageUtils } from '../utils'
import '../styles/app.css'

class App extends Component {
  state = {
    username: null,
    images: [],
    filters: {},
    favorites: [],
    showThumbs: false,
    loading: false,
    error: null,
    exampleUsers: [
      'angrymikko',
      'jaromvogel',
      'zatransis',
      'rebeccamillsdraws',
      '⭐️'
    ]
  };

  componentDidMount () {
    if (window.location.hash) {
      this._checkUsernameInHash(window.location.hash)
    }
    window.addEventListener('hashchange', this._onHashChange)
  };

  render () {
    const { username, images, loading, error } = this.state
    return (
      <div className="app">
        <Header
          username={username}
          onSetUsername={this._onSetUsername}
        />
        {images.length > 0 && !loading &&
          <GalleryFilters
            filters={this.state.filters}
            onChange={this._onFilter}
          />
        }
        {!loading &&
          <Gallery
            filters={this.state.filters}
            images={this._galleryImages()}
            onFavorite={this._onFavorite}
          />
        }
        {loading &&
          <Spinner />
        }
        {images.length === 0 && !loading &&
          <div className="app__start">
            {error &&
              <p className="app__start__error">{error}</p>
            }
            <p className="app__start__message">Fill the username <span role="img" aria-label="point_up">☝️</span></p>
            <p className="app__start__example">Examples:</p>
            <ul className="app__start__example-users">
              {this._getExampleUsers()}
            </ul>
          </div>
        }
        <Footer />
      </div>
    )
  };

  _onSetUsername = username => {
    if (username) {
      if (username === '⭐️' || username === 'favorites') {
        window.history.pushState({}, 'username_favorites', '#/@favorites')
        document.title = `favorites / Insta Gallerify`
        const images = imageUtils.getFavorites()
        if (images.length > 0) {
          this.setState({ username, images })
        } else {
          this.setState({
            error: 'You have no favorites yet!',
            username: '',
            images: []
          })
        }
      } else {
        window.history.pushState({}, `username_${username}`, `#/@${username}`)
        document.title = `@${username} / Insta Gallerify`
        if (username !== this.state.username) {
          this.setState({ loading: true }, () => {
            return api.fetchUser(username).then(images => {
              this.setState({ username, images })
            }).catch(error => {
              this.setState({
                error: error.message,
                username: '',
                images: []
              })
            }).finally(() => {
              this.setState({ loading: false })
            })
          })
        }
      }
    } else {
      this.setState({ username: '', images: [] })
    }
  };

  _galleryImages = () => {
    let list = []
    const { images, filters } = this.state
    if (images.length > 0) {
      list = imageUtils.filterImages({ images, ...filters })
    }
    list = list.map(photo => {
      return {
        ...photo,
        favorite: imageUtils.isFavorite(photo)
      }
    })
    return list
  };

  _onFilter = filters => {
    this.setState({ filters })
  };

  _getExampleUsers = () => {
    const { exampleUsers } = this.state
    return exampleUsers.map((username, index) => {
      return (
        <li key={index}>
          <span
            onClick={() => this._onSetUsername(username)}
          >{username}</span>
        </li>
      )
    })
  };

  _checkUsernameInHash = hash => {
    const parts = hash.split('@')
    if (parts.length > 0) {
      this._onSetUsername(parts[1])
    }
  };

  _onHashChange = event => {
    this._checkUsernameInHash(event.newURL)
  };

  _onFavorite = photo => {
    const images = this.state.images.map(item => {
      if (item.url === photo.url) {
        item.favorite = !item.favorite
      }
      return item
    })
    this.setState({ images })
  };
}

export default App
