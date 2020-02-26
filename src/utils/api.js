export default {
  /**
   * Fetch mock
   * @returns {Promise.<object[]>}
   */
  fetchMock() {
    const response = require('../mock/items.json')
    const { edges } = response.graphql.user.edge_owner_to_timeline_media
    return Promise.resolve(
      edges.map(this.buildImageItem)
    )
  },

  /**
   * Fetch user data
   * @param {string} username
   * @param {number} limit
   * @returns {Promise.<object[]>}
   */
  fetchUser(username, limit = 50) {
    if (username === 'mock') {
      return this.fetchMock()
    }
    const url = `https://www.instagram.com/${username}/?__a=1`
    return fetch(url)
      .then(response => {
        if (response.ok === false) {
          throw new Error('We didn\'t get API response. Please, try again.')
        }
        return response.json()
      })
      .then(result => {
        const {
          graphql: {
            user: { is_private }
          }
        } = result

        if (is_private) {
          throw new Error('User profile is private.')
        }

        let promises = []
        let images = []
        if (result.graphql) {
          const { id } = result.graphql.user
          const {
            edges,
            count
          } = result.graphql.user.edge_owner_to_timeline_media
          const hasNextPage =
            result.graphql.user.edge_owner_to_timeline_media.page_info
              .has_next_page
          const endCursor =
            result.graphql.user.edge_owner_to_timeline_media.page_info
              .end_cursor
          const isPrivate = result.graphql.user.is_private
          if (count > 0 && !isPrivate) {
            images = edges.map(this.buildImageItem)
          }

          if (hasNextPage) {
            // @todo: get queryHash dynamic
            const queryHash = 'f2405b236d85e8296cf30347c9f08c2a'
            const first = 50
            const maxPages = 20
            let page = 1

            const loop = endCursor => {
              const query = {
                query_hash: queryHash,
                variables: `{"id":"${id}","first":${first},"after":"${endCursor}"}`
              }
              const urlPagination = `https://www.instagram.com/graphql/query?query_hash=${query.query_hash}&variables=${query.variables}`
              return fetch(urlPagination)
                .then(response => {
                  return response.json()
                })
                .then(result => {
                  if (result.status === 'ok') {
                    const {
                      edges
                    } = result.data.user.edge_owner_to_timeline_media
                    const hasNextPage =
                      result.data.user.edge_owner_to_timeline_media.page_info
                        .has_next_page
                    const endCursor =
                      result.data.user.edge_owner_to_timeline_media.page_info
                        .end_cursor

                    edges.forEach(item => {
                      images.push(this.buildImageItem(item))
                    })

                    page++

                    if (hasNextPage && page < maxPages) {
                      if (images.length < +limit || +limit === 0) {
                        return loop(endCursor)
                      }
                    }
                  }
                })
                .catch(error => {
                  console.log('pagination error:', error)
                })
            }

            promises.push(loop(endCursor))
          }
        }
        if (images.length === 0) {
          throw new Error('User not found.')
        }
        return Promise.all(promises).then(() => {
          return images
        })
      })
      .catch(error => {
        throw new Error(error)
      })
  },

  /**
   * Build image item
   * @param {object} item
   * @returns {object}
   */
  buildImageItem (item) {
    let likes = 0
    if (item.node.edge_liked_by) {
      likes = +item.node.edge_liked_by.count
    } else if (item.node.edge_media_preview_like) {
      likes = item.node.edge_media_preview_like.count
    }
    return {
      url: item.node.display_url,
      thumbnail_url: item.node.thumbnail_src,
      shortcode: item.node.shortcode,
      timestamp: item.node.taken_at_timestamp,
      likes
    }
  }
}
