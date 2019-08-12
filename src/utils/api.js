export default {
  /**
   * Fetch user data
   * @param {string} username
   * @returns {Promise.<object[]>}
   */
  fetchUser (username) {
    const url = `https://www.instagram.com/${username}/?__a=1`
    return fetch(url).then(response => {
      return response.json()
    }).then(result => {
      let promises = []
      let images = []
      if (result.graphql) {
        const { id } = result.graphql.user
        const { edges, count } = result.graphql.user.edge_owner_to_timeline_media
        const hasNextPage = result.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page
        const endCursor = result.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor
        const isPrivate = result.graphql.user.is_private
        if (count > 0 && !isPrivate) {
          images = edges.map(item => {
            return {
              url: item.node.display_url,
              shortcode: item.node.shortcode,
              timestamp: item.node.taken_at_timestamp,
              likes: +item.node.edge_liked_by.count
            }
          })
        }

        if (hasNextPage) {
          // @todo: get queryHash dynamic
          const queryHash = 'f2405b236d85e8296cf30347c9f08c2a'
          const limit = 50
          const maxPages = 20
          let page = 1

          const loop = (endCursor) => {
            const query = {
              query_hash: queryHash,
              variables: `{"id":"${id}","first":${limit},"after":"${endCursor}"}`
            }
            const urlPagination = `https://www.instagram.com/graphql/query?query_hash=${query.query_hash}&variables=${query.variables}`
            return fetch(urlPagination).then(response => {
              return response.json()
            }).then(result => {
              if (result.status === 'ok') {
                const { edges } = result.data.user.edge_owner_to_timeline_media
                const hasNextPage = result.data.user.edge_owner_to_timeline_media.page_info.has_next_page
                const endCursor = result.data.user.edge_owner_to_timeline_media.page_info.end_cursor

                edges.forEach(item => {
                  images.push({
                    url: item.node.display_url,
                    shortcode: item.node.shortcode,
                    timestamp: item.node.taken_at_timestamp,
                    likes: +item.node.edge_media_preview_like.count
                  })
                })

                page++

                if (hasNextPage && page < maxPages) {
                  return loop(endCursor)
                }
              }
            }).catch(error => {
              console.log('pagination error:', error)
            })
          }

          promises.push(loop(endCursor))
        }
      }
      if (images.length === 0) {
        throw new Error('User not found or private')
      }
      return Promise.all(promises).then(() => {
        return images
      })
    }).catch(error => {
      throw new Error('User not found or private')
    })
  }
}
