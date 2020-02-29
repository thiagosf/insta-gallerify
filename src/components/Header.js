import React, { Component } from 'react'
import '../styles/header.css'

const headerButton = ({ onClick, enabled, name, icon }) => {
  let classes = [`main-header__${name}`]
  if (enabled) {
    classes.push(`main-header__${name}--enabled`)
  }
  classes = classes.join(' ')
  return (
    <span
      className={classes}
      onClick={onClick}
    ><span role="img" aria-label="filters">{icon}</span></span>
  )
}

class Header extends Component {
  static defaultProps = {
    loading: false,
    username: null,
    filters: {},
    onSetUsername: () => {},
    onEnableFilters: () => {},
    enabled: false
  }

  state = {
    username: '',
    valid: false,
    fullscreen: false,
    enableFilters: false
  }

  componentDidMount () {
    document.addEventListener('fullscreenchange', this._onFullscreenChange)
  }

  componentWillUnmount () {
    document.removeEventListener('fullscreenchange', this._onFullscreenChange)
  }

  componentDidUpdate (prevProps) {
    const { username } = this.props
    if (username !== prevProps.username) {
      this.setState({ username, valid: !!username })
    }
  }

  render () {
    const {
      username,
      valid,
      fullscreen,
      enableFilters
    } = this.state
    return (
      <header className={this._getClasses()}>
        {headerButton({
          icon: '🧐',
          name: 'enable-filters',
          enabled: enableFilters,
          onClick: this._toggleEnableFilters
        })}
        {headerButton({
          icon: '👓',
          name: 'fullscreen',
          enabled: fullscreen,
          onClick: this._toggleFullScreen
        })}
        {valid &&
          <div className="main-header__user"  onClick={this._edit}>
            <p className="main-header__user__name">{username}</p>
          </div>
        }
        {!valid &&
          <input
            name='username'
            className="main-header__input"
            ref={ref => this.input = ref}
            type="text"
            value={username}
            placeholder="@username"
            onChange={this._handleChange}
            onKeyPress={this._handleKey}
            onBlur={this._handleBlur}
          />
        }
      </header>
    )
  }

  _getClasses = () => {
    let classes = ['main-header']
    if (this.props.loading) {
      classes.push('main-header--loading')
    }
    if (this.props.enabled) {
      classes.push('main-header--enabled')
    }
    return classes.join(' ')
  }

  _handleKey = event => {
    if (event.key === 'Enter') {
      this._setValid()
    }
  }

  _handleBlur = () => {
    if (this.state.username) {
      this._setValid()
    }
  }

  _handleChange = event => {
    this.setState({ username: event.target.value.trim() })
  }

  _setValid = () => {
    const valid = this.state.username !== ''
    this.setState({ valid }, () => {
      this.props.onSetUsername(this.state.username)
    })
  }

  _edit = () => {
    this.setState({ valid: false }, () => {
      this.input.select()
    })
  }

  _toggleFullScreen = () => {
    this.setState({ fullscreen: !this.state.fullscreen }, () => {
      if (this.state.fullscreen) {
        document.body.requestFullscreen().catch(error => {
          // console.log('error', error)
        })
      } else {
        document.exitFullscreen().catch(error => {
          // console.log('error', error)
        })
      }
    })
  }

  _toggleEnableFilters = () => {
    this.setState({ enableFilters: !this.state.enableFilters }, () => {
      this.props.onEnableFilters(this.state.enableFilters)
    })
  }

  _onFullscreenChange = () => {
    const isFullScreen = document.fullscreen
    this.setState({ fullscreen: isFullScreen })
  }
}

export default Header
