import React from 'react'
import LazyLoad from 'vanilla-lazyload'

if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy'
  })
}

export class LazyImage extends React.Component {
  componentDidMount() {
    document.lazyLoadInstance.update()
  }

  componentDidUpdate() {
    document.lazyLoadInstance.update()
  }

  render() {
    const { alt, src, srcset, sizes, width, height, ...others } = this.props
    let className = 'lazy'
    if (others.className) {
      className += ` ${others.className}`
    }
    return (
      <img
        {...others}
        alt={alt}
        className={className}
        data-src={src}
        data-srcset={srcset}
        data-sizes={sizes}
        width={width}
        height={height}
      />
    )
  }
}

export default LazyImage
