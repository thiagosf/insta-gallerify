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
      let images = []
      if (result.graphql) {
        const { edges, count } = result.graphql.user.edge_owner_to_timeline_media
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
      }
      if (images.length === 0) {
        throw new Error('User not found or private')
      }
      return images
    }).catch(error => {
      throw new Error('User not found or private')
    })
  }
}
