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

  state = {
    loaded: [],
    thumbViewScrollTop: 0,
    showThumbView: true,
    selected: null
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
    if (prevProps.thumbView !== this.props.thumbView) {
      if (this.props.thumbView) {
        this._setThumbViewScrollTop()
        setTimeout(() => {
          document.querySelector('.gallery-thumb-view').addEventListener('scroll', this._onScrollChange)
        }, 1000)
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
    const { selected } = this.state
    const classes = this._getClassesThumbView()
    let loaded = [...this.state.loaded]
    return (
      <div className={classes}>
        <div className="gallery-thumb-view__wrapper">
          {this.props.images.map((item, index) => {
            let classes = ['gallery-thumb-view__item']
            if (loaded.includes(item.shortcode)) {
              classes.push('gallery-thumb-view__item--loaded')
            }
            if (item.shortcode === selected) {
              classes.push('gallery-thumb-view__item--selected')
            }
            classes = classes.join(' ')
            return (
              <div key={`${index}-${item.shortcode}`} className={classes}>
                <LazyImage
                  className="gallery-thumb-view__item__image"
                  src={item.thumbnail_url}
                  alt={item.shortcode}
                  onClick={() => {
                    this.setState({ selected: item.shortcode }, () => {
                      this.props.onSelectImage(index)
                    })
                  }}
                  onLoad={() => {
                    loaded.push(item.shortcode)
                    this.setState({ loaded })
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  _onScrollChange = event => {
    const top = document.querySelector('.gallery-thumb-view').scrollTop
    this.setState({ thumbViewScrollTop: top })
  }

  _setThumbViewScrollTop = () => {
    const endTop = this.state.thumbViewScrollTop
    const el = document.querySelector('.gallery-thumb-view')
    let showThumbView = true
    if (endTop > 0) {
      showThumbView = false
    }
    this.setState({ showThumbView }, () => {
      setTimeout(() => {
        el.scrollTop = endTop
        this.setState({ showThumbView: true })
      }, 200)
    })
  }

  _getClassesThumbView = () => {
    let classes = ['gallery-thumb-view']
    if (this.state.showThumbView) {
      classes.push('gallery-thumb-view--enabled')
    }
    return classes.join(' ')
  }
}

export default Gallery
