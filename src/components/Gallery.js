import React, { Component } from 'react'
import Slider from 'react-slick'
import Photo from './Photo'
import '../styles/gallery.css'

class Gallery extends Component {
  static defaultProps = {
    images: []
  };

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: false,
      accessibility: true
    }

    const { images } = this.props
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
          likes={image.likes}
        />
      )
    })

    return (
      <Slider {...settings}>
        {slides}
      </Slider>
    )
  }
}

export default Gallery
