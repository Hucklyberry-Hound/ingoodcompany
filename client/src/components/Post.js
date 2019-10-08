import React from 'react'

const Post = (props) => {
    console.log('post', props)
    return (
        <ul>
        <li>{props.post.description}</li>
        <li>{props.post.url}</li>
        </ul>
    )
}

export default Post 
