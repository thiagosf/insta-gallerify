import React, { Component } from 'react'
import Slider from 'react-slick'

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
      variableWidth: true,
      accessibility: true
    }

    const { images } = this.props
    if (images.length === 0) {
      return false
    }
    const slides = images.map((image, index) => {
      return (
        <div key={index}>
          <img src={image.url} alt='' />
        </div>
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
