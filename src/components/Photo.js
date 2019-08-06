import React, { Component } from 'react'
import numeral from 'numeral'
import '../styles/photo.css'

class Photo extends Component {
  static defaultProps = {
    url: '',
    shortcode: '',
    timestamp: '',
    likes: 0,
    favorite: false,
    onFavorite: () => {}
  };

  render() {
    const { url } = this.props
    return (
      <div className="photo">
        <div className="photo__info">
          <div className="photo__info__vertical-group">
            <span className={this._getFavoriteClasses()} onClick={this._toggleFavorite}>
              <span className="photo__info__favorite__icon" role="img" aria-label="star">⭐️</span>
            </span>
            <span className="photo__info__likes">
              <span className="photo__info__likes__icon" role="img" aria-label="heart">❤️</span> {this._friendlyLikes()}
            </span>
          </div>
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
    if (likes > 1000) {
      return numeral(likes).format('0.0a')
    }
    return likes
  };

  _getLink = () => {
    const { shortcode } = this.props
    return `https://www.instagram.com/p/${shortcode}`
  };

  _getDate = () => {
    const { timestamp } = this.props
    return (new Date(+timestamp * 1000)).toLocaleString()
  };

  _getFavoriteClasses = () => {
    let classes = ['photo__info__favorite']
    if (this.props.favorite) {
      classes.push('photo__info__favorite--active')
    }
    return classes.join(' ')
  };

  _toggleFavorite = () => {
    this.props.onFavorite({
      url: this.props.url,
      shortcode: this.props.shortcode,
      timestamp: this.props.timestamp,
      likes: this.props.likes
    })
  };
}

export default Photo
