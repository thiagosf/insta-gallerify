import React, { Component } from 'react'

class GalleryFilter extends Component {
  static defaultProps = {
    onChange: () => {},
    selected: null,
    values: []
  }

  render () {
    return (
      <div className="gallery-filters__filter">
        {this._getItems()}
      </div>
    )
  }

  _getItems = () => {
    const { values, selected } = this.props
    return values.map((item, index) => {
      let classes = ['gallery-filters__filter__value']
      if (item.value === selected) {
        classes.push('gallery-filters__filter__value--active')
      }
      return (
        <span
          key={index}
          className={classes.join(' ')}
          onClick={() => this.props.onChange(item.value)}
        >{item.label}</span>
      )
    })
  }
}

export default GalleryFilter
