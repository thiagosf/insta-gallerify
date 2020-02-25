import React, { Component } from 'react'
import GalleryFilter from './GalleryFilter'
import '../styles/gallery_filters.css'

class GalleryFilters extends Component {
  static defaultProps = {
    loading: false,
    onChange: () => {},
    filters: {}
  }

  render () {
    return (
      <div className={this._getClasses()}>
        {this._getSortFilters()}
        {this._getLimitFilters()}
        {this._getModeFilters()}
      </div>
    )
  }

  _getClasses = () => {
    let classes = ['gallery-filters']
    if (this.props.loading) {
      classes.push('gallery-filters--loading')
    }
    return classes.join(' ')
  }

  _getSortFilters = () => {
    const { sort = 'recent' } = this.props.filters
    const values = [{
      value: 'likes',
      label: 'likes'
    }, {
      value: 'recent',
      label: 'recent'
    }, {
      value: 'oldest',
      label: 'oldest'
    }]
    return (
      <GalleryFilter
        selected={sort}
        values={values}
        onChange={value => this._onChangeFilter('sort', value)}
      />
    )
  }

  _getLimitFilters = () => {
    const { limit = 50 } = this.props.filters
    const values = [{
      value: 10,
      label: 10
    }, {
      value: 50,
      label: 50
    }, {
      value: 0,
      label: 'all'
    }]
    return (
      <GalleryFilter
        selected={limit}
        values={values}
        onChange={value => this._onChangeFilter('limit', value)}
      />
    )
  }

  _getModeFilters = () => {
    const { mode = 'gallery' } = this.props.filters
    const values = [{
      value: 'gallery',
      label: 'gallery'
    }, {
      value: 'thumb',
      label: 'thumb'
    }]
    return (
      <GalleryFilter
        selected={mode}
        values={values}
        onChange={value => this._onChangeFilter('mode', value)}
      />
    )
  }

  _onChangeFilter = (name, value) => {
    this.props.onChange(name, value)
  }
}

export default GalleryFilters
