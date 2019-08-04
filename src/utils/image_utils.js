import _ from 'lodash'

export default {
  /**
   * Filter images by sort and limit
   * @param {object} options
   * @param {string} options.sort
   * @param {number} options.limit
   * @returns {object[]}
   */
  filterImages ({ images, sort, limit }) {
    let filteredImages = [].concat(images)
    if (sort === 'likes') {
      filteredImages = _.sortBy(filteredImages, 'likes').reverse()
    }
    if (limit > 0) {
      filteredImages = filteredImages.slice(0, limit)
    }
    return filteredImages
  }
}
