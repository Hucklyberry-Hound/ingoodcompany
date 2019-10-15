import React from "react";

import CreatePostForm from "./createPostForm";
import PostItem from "./postitem";


export default class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    const { posts, communityId, slug } = props;
    this.state = {
      posts,
      communityId,
      slug
    };

    this.update = this.update.bind(this);
  }

  update(newPost) {
    this.setState({ posts: [...this.state.posts, newPost] });
  }

  render() {
    const { posts, communityId, slug } = this.state;
    return posts.length ? (
      <div >
        <CreatePostForm communityId={communityId} updateParent={this.update} />
        {posts.map(post => {
          return (
            <PostItem
              item={post}
              slug={slug}
              communityId={communityId}
              key={post.id}
            />
          );
        })}
      </div>
    ) : (
      <div>
        <h1>Looks Like There Are No Posts Here :(</h1>
        <CreatePostForm communityId={communityId} updateParent={this.update} />
      </div>
    );
  }
}
