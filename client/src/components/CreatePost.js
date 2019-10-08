import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!, $community: String!) {
        createNewPost(description: $description, url: $url, community: $community) {
            id
            url
            description
  }
}
`

class CreatePost extends React.Component {
    constructor() {
        super()
        this.state = {
            url: '',
            description: '',
            community: 'ck1f7m9hesmka0b408wtvwlir'
        }
    }

    render () {
        return (
            <div> 
                <input
                value={this.state.url}
                placeholder="Enter URL"
                type="text"
                onChange={(event)=> this.setState({url: event.target.value})}></input>
                <input
                value={this.state.description}
                placeholder="Enter Description"
                type="text"
                onChange={(event)=> this.setState({description: event.target.value})}></input>
                <Mutation mutation={POST_MUTATION} variables={this.state}>
                    {postMutation => <button onClick={postMutation}>Submit</button>}
                </Mutation>
            </div>
        )
    }
}

export default CreatePost
