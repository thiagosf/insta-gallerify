import React, { Component } from 'react'
import Slider from 'react-slick'
import Photo from './Photo'
import { imageUtils } from '../utils'
import '../styles/gallery.css'

class Gallery extends Component {
  static defaultProps = {
    filters: {},
    images: [],
    onFavorite: () => {}
  };

  componentDidUpdate (prevProps) {
    if (
      this.props.images.length !== prevProps.images.length ||
      this.props.filters !== prevProps.filters
    ) {
      if (this.slider) {
        this.slider.slickGoTo(0)
      }
    }
  };

  render() {
    const { images } = this.props
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: false,
      accessibility: true,
      lazyLoad: 'progressive'
    }
    if (images.length === 0) {
      return false
    }
    const slides = images.map((image, index) => {
      return (
        <Photo
          key={index}
          url={image.url}
          shortcode={image.shortcode}
          timestamp={image.timestamp}
          favorite={image.favorite}
          likes={image.likes}
          onFavorite={this._onFavorite}
        />
      )
    })
    return (
      <Slider
        ref={ref => this.slider = ref}
        {...settings}
      >
        {slides}
      </Slider>
    )
  };

  _onFavorite = photo => {
    imageUtils.toggleFavorite(photo)
    this.props.onFavorite(photo)
  };
}

export default Gallery
