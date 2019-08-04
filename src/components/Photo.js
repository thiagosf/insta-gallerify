import React, { Component } from 'react'
import numeral from 'numeral'
import '../styles/photo.css'

class Photo extends Component {
  static defaultProps = {
    url: '',
    shortcode: '',
    timestamp: '',
    likes: 0
  };

  render() {
    const { url } = this.props
    return (
      <div className="photo">
        <div className="photo__info">
          <span className="photo__info__likes">
            <span className="photo__info__likes__icon" role="img" aria-label="heart">❤️</span> {this._friendlyLikes()}
          </span>
          <span className="photo__info__timestamp">
            {this._getDate()}
          </span>
          <a href={this._getLink()} target="_blank" rel="noopener noreferrer"  className="photo__info__link">link</a>
        </div>
        <img src={url} alt='' />
      </div>
    )
  };

  _friendlyLikes = () => {
    const { likes } = this.props
    return numeral(likes).format('0.0a')
  };

  _getLink = () => {
    const { shortcode } = this.props
    return `https://www.instagram.com/p/${shortcode}`
  };

  _getDate = () => {
    const { timestamp } = this.props
    return (new Date(+timestamp * 1000)).toLocaleString()
  };
}

export default Photo
