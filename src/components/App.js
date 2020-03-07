import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Gallery from './Gallery'
import GalleryFilters from './GalleryFilters'
import Spinner from './Spinner'
import { api, imageUtils } from '../utils'
import logo from '../assets/images/logo.png'
import '../styles/app.css'

class App extends Component {
  state = {
    username: null,
    tempUsername: null,
    images: [],
    filters: {},
    favorites: [],
    showThumbs: false,
    loading: false,
    error: null,
    lastLimit: 50,
    enabledFilters: false,
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
    const {
      username,
      images,
      loading,
      error,
      enabledFilters
    } = this.state
    return (
      <div className="app">
        <Header
          loading={loading}
          filters={this.state.filters}
          username={username}
          onSetUsername={this._onSetUsername}
          onEnableFilters={this._onEnableFilters}
          enabled={!!username}
        />
        <GalleryFilters
          loading={loading}
          filters={this.state.filters}
          onChange={this._onFilter}
          enabled={enabledFilters}
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
            <div className="app__start__logo">
              <img src={logo} alt="Insta Gallerify" />
            </div>
            {error &&
              <p className="app__start__error">{error}</p>
            }
            <div className="app__start__input-box">
              <input
                autoFocus
                placeholder="@username"
                className="app__start__input-box__input"
                onChange={this._onChanageInput}
                onKeyPress={this._onKeyPressInput}
              />
            </div>
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

  _onSetUsername = (username, params = null) => {
    let filters = {
      ...this.state.filters
    }
    if (params) {
      params.split(',').forEach(item => {
        const parts = item.split(':')
        const name = parts[0]
        let value = parts[1]
        if (name === 'limit') {
          value = +value
        }
        filters[name] = value
      })
    }
    this.setState({ filters }, () => {
      const formatedParams = params ? `?${params}` : ''
      if (username) {
        if (username === '⭐️' || username === 'favorites') {
          window.history.pushState({}, 'username_favorites', `#/@favorites${formatedParams}`)
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
          window.history.pushState({}, `username_${username}`, `#/@${username}${formatedParams}`)
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
    })
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
      this._changeFiltersInURL()
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
      const [username, params] = parts[1].split('?')
      this._onSetUsername(username, params)
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

  _onEnableFilters = value => {
    this.setState({ enabledFilters: value })
  }

  _changeFiltersInURL = () => {
    const { username, filters } = this.state
    let formatedParams = []
    for (let param in filters) {
      const value = filters[param]
      formatedParams.push(`${param}:${value}`)
    }
    formatedParams = formatedParams.join(',')
    if (formatedParams) {
      formatedParams = `?${formatedParams}`
    }
    window.history.pushState({}, 'username_favorites', `#/@${username}${formatedParams}`)
  }

  _onChanageInput = event => {
    this.setState({
      tempUsername: event.target.value.trim()
    })
  }

  _onKeyPressInput = event => {
    if (event.key === 'Enter') {
      this._setValid()
    }
  }

  _setValid = () => {
    this._onSetUsername(this.state.tempUsername)
  }
}

export default App
