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
    } else if (sort === 'oldest') {
      filteredImages = filteredImages.reverse()
    }
    if (limit > 0) {
      filteredImages = filteredImages.slice(0, limit)
    }
    return filteredImages
  },

  /**
   * Adiciona favorito
   * @param {object} photo
   */
  toggleFavorite (photo) {
    let favorites = this.getFavorites()
    const favorite = favorites.find(item => item.url === photo.url)
    if (!favorite) {
      favorites.push(photo)
    } else {
      favorites = favorites.filter(item => item.url !== photo.url)
    }

    favorites = JSON.stringify(favorites)
    localStorage.setItem('favorites', favorites)
  },

  /**
   * Verifica se é favorito
   * @param {object} photo
   * @param {boolean}
   */
  isFavorite (photo) {
    let favorites = this.getFavorites()
    const favorite = favorites.find(item => item.url === photo.url)
    return favorite !== undefined
  },

  /**
   * Resgata favoritos
   * @returns {object[]}
   */
  getFavorites () {
    let favorites = localStorage.getItem('favorites')
    if (favorites) {
      favorites = JSON.parse(favorites)
    } else {
      favorites = []
    }
    return favorites
  }
}
