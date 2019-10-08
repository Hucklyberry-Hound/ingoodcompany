import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Post from './Post'

const Posts = (props) => {
   
    const POSTS_QUERY = gql`
  {
    feed {
            description
            url
            id
        }
      }
`

return (
    <Query query={POSTS_QUERY}>
      {({ loading, error, data }) => {
          console.log(data)
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>
  
        const postsToRender = data.feed
        console.log(postsToRender)
  
        return (
          <div>
              HERE ARE ALL THE POSTS 
            {postsToRender.map(post => <Post key={post.id} post={post} />)}
          </div>
        )
      }}
    </Query>
  )
}


export default Posts
