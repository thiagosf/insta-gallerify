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
    lastLimit: 50,
    exampleUsers: [
      'angrymikko',
      'jaromvogel',
      'zatransis',
      'rebeccamillsdraws',
      '⭐️'
    ]
  }

  componentDidMount () {
    if (window.location.hash) {
      this._checkUsernameInHash(window.location.hash)
    }
    window.addEventListener('hashchange', this._onHashChange)
  }

  render () {
    const { username, images, loading, error } = this.state
    return (
      <div className="app">
        <Header
          loading={loading}
          username={username}
          onSetUsername={this._onSetUsername}
        />
        <GalleryFilters
          loading={loading}
          filters={this.state.filters}
          onChange={this._onFilter}
        />
        {!loading &&
          <Gallery
            ref={ref => this.gallery = ref}
            filters={this.state.filters}
            images={this._galleryImages()}
            onFavorite={this._onFavorite}
            thumbView={this.state.filters.mode === 'thumb'}
            onSelectImage={this._onSelectImage}
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
  }

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
        const lastLimit = this.state.filters.limit || this.state.lastLimit || 50
        if (username !== this.state.username) {
          this.setState({ loading: true, lastLimit }, () => {
            return this._loadData(username, this.state.filters.limit)
          })
        }
      }
    } else {
      this.setState({ username: '', images: [] })
    }
  }

  _loadData = (username, limit) => {
    return api.fetchUser(username, limit).then(images => {
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
  }

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
  }

  _onFilter = (name, value) => {
    const filters = {
      ...this.state.filters,
      [name]: value
    }
    this.setState({ filters }, () => {
      if (
        this.state.lastLimit > 0 &&
        (
          this.state.lastLimit < filters.limit ||
          (this.state.lastLimit !== 0 && filters.limit === 0)
        )
      ) {
        const lastLimit = filters.limit
        this.setState({ loading: true, lastLimit }, () => {
          this._loadData(this.state.username, lastLimit)
        })
      }
    })
  }

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
  }

  _checkUsernameInHash = hash => {
    const parts = hash.split('@')
    if (parts.length > 0) {
      this._onSetUsername(parts[1])
    }
  }

  _onHashChange = event => {
    this._checkUsernameInHash(event.newURL)
  }

  _onFavorite = photo => {
    const images = this.state.images.map(item => {
      if (item.url === photo.url) {
        item.favorite = !item.favorite
      }
      return item
    })
    this.setState({ images })
  }

  _onSelectImage = index => {
    const filters = {
      ...this.state.filters,
      mode: 'gallery'
    }
    this.setState({ filters }, () => {
      this.gallery.goTo(index)
    })
  }
}

export default App
