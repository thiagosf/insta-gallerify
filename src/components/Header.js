import React, { Component } from 'react'
import '../styles/header.css'

class Header extends Component {
  state = {
    username: '',
    valid: false,
    fullscreen: false
  };

  componentDidUpdate (prevProps) {
    const { username } = this.props
    if (username !== prevProps.username) {
      this.setState({ username }, () => {
        this._setValid()
      })
    }
  }

  render () {
    const { username, valid } = this.state
    return (
      <header className="main-header">
        <span className="main-header__fullscreen" onClick={this._toggleFullScreen}><span role="img" aria-label="eyeglasses">👓</span></span>
        {valid &&
          <div className="main-header__user"  onClick={this._edit}>
            <p className="main-header__user__name">{username}</p>
          </div>
        }
        {!valid &&
          <input
            autoFocus
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
  };

  _handleKey = event => {
    if (event.key === 'Enter') {
      this._setValid()
    }
  };

  _handleBlur = () => {
    if (this.state.username) {
      this._setValid()
    }
  };

  _handleChange = event => {
    this.setState({ username: event.target.value.trim() })
  };

  _setValid = () => {
    const valid = this.state.username !== ''
    this.setState({ valid }, () => {
      this.props.onSetUsername(this.state.username)
    })
  };

  _edit = () => {
    this.setState({ valid: false }, () => {
      this.input.select()
    })
  };

  _toggleFullScreen = () => {
    this.setState({ fullscreen: !this.state.fullscreen }, () => {
      if (this.state.fullscreen) {
        document.body.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    })
  };
}

export default Header
