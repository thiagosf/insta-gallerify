import _ from 'lodash'

export default {
  fetchUser (username) {
    // const result = require('../mock/items.json')
    const url = `https://www.instagram.com/${username}/?__a=1`
    return fetch(url).then(response => {
      return response.json()
    }).then(result => {
      // console.log('-------')
      // console.log(result)
      let images = []
      if (result.graphql) {
        const { edges, count } = result.graphql.user.edge_owner_to_timeline_media
        if (count > 0) {
          images = edges.map(item => {
            return {
              url: item.node.display_url,
              likes: +item.node.edge_liked_by.count
            }
          })
          images = _.sortBy(images, 'likes').reverse()
          images = images.slice(0, 50)
        }
      }
      return images
    })
  }
}
