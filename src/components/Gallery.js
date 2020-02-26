import React, { Component } from 'react'
import Slider from 'react-slick'
import Photo from './Photo'
import LazyImage from './LazyImage'
import { imageUtils } from '../utils'
import '../styles/gallery.css'

class Gallery extends Component {
  static defaultProps = {
    filters: {},
    images: [],
    onFavorite: () => {},
    onSelectImage: () => {},
    thumbView: false
  }

  componentDidUpdate (prevProps) {
    if (
      this.props.images.length !== prevProps.images.length ||
      this.props.filters !== prevProps.filters
    ) {
      if (this.slider) {
        this.slider.slickGoTo(0)
      }
    }
  }

  render() {
    const { images, thumbView } = this.props
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: false,
      accessibility: true,
      lazyLoad: 'ondemand'
    }
    if (images.length === 0) {
      return false
    }
    if (thumbView) {
      return this._getThumbView()
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
  }

  goTo (index) {
    this.slider.slickGoTo(index, true)
  }

  _onFavorite = photo => {
    imageUtils.toggleFavorite(photo)
    this.props.onFavorite(photo)
  }

  _getThumbView = () => {
    return (
      <div className="gallery-thumb-view">
        {this.props.images.map((item, index) => {
          return (
            <div key={index} className="gallery-thumb-view__item">
              <LazyImage
                className="gallery-thumb-view__item__image"
                src={item.thumbnail_url}
                alt={item.shortcode}
                onClick={() => {
                  this.props.onSelectImage(index)
                }}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default Gallery
