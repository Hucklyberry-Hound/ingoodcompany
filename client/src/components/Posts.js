import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Post from './Post'
import CreatePost from './CreatePost'

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
    <React.Fragment>
        <Query query={POSTS_QUERY}>
        {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>
            return (
            <div>
                HERE ARE ALL THE POSTS 
                {data.feed.map(post => <Post key={post.id} post={post} />)}
            </div>
            )
        }}
        </Query>
    <CreatePost />
    </React.Fragment>
  )
}


export default Posts
