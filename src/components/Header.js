import React, { Component } from 'react'

class Header extends Component {
  state = {
    username: '',
    valid: false
  };

  render () {
    const { username, valid } = this.state
    return (
      <header className="main-header">
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
          />
        }
      </header>
    )
  };

  _handleKey = event => {
    if (event.key === 'Enter') {
      this.setState({ valid: true }, () => {
        this.props.onSetUsername(this.state.username)
      })
    }
  };

  _handleChange = event => {
    this.setState({ username: event.target.value })
  };

  _edit = () => {
    this.setState({ valid: false }, () => {
      this.input.select()
    })
  }
}

export default Header
