import React, { Component } from 'react'
import GalleryFilter from './GalleryFilter'
import '../styles/gallery_filters.css'

class GalleryFilters extends Component {
  static defaultProps = {
    onChange: () => {},
    filters: {}
  };

  state = {
    sort: 'recent',
    limit: 30
  };

  render () {
    return (
      <div className="gallery-filters">
        {this._getSortFilters()}
        {this._getLimitFilters()}
      </div>
    )
  };

  _getSortFilters = () => {
    const { sort } = this.state
    const values = [{
      value: 'recent',
      label: 'recent'
    }, {
      value: 'likes',
      label: 'likes'
    }]
    return (
      <GalleryFilter
        selected={sort}
        values={values}
        onChange={value => this._onChangeFilter('sort', value)}
      />
    )
  };

  _getLimitFilters = () => {
    const { limit } = this.state
    const values = [{
      value: 30,
      label: 30
    }, {
      value: 70,
      label: 70
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
  };

  _onChangeFilter = (name, value) => {
    this.setState({ [name]: value }, () => {
      this.props.onChange(this.state)
    })
  };
}

export default GalleryFilters