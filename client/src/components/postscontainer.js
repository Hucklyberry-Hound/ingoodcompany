import React from 'react';

import CreatePostForm from './createPostForm';
import PostItem from './postitem';

//CSS import
import '../styles/Post.css';

export default class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    const { posts, communityId, slug } = props;
    this.state = {
      posts,
      communityId,
      slug,
    };

    this.update = this.update.bind(this);
  }

  update(newPost) {
    this.setState({ posts: [...this.state.posts, newPost] });
  }

  render() {
    const { posts, communityId, slug } = this.state;
    return posts.length ? (
      <React.Fragment>
        <CreatePostForm
          communityId={communityId}
          slug={slug}
          updateParent={this.update}
        />
        <div className="all-post">
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
      </React.Fragment>
    ) : (
      <React.Fragment>
        <h1 className="no-posts">Looks Like There Are No Posts Here :(</h1>
        <CreatePostForm communityId={communityId} updateParent={this.update} />
      </React.Fragment>
    );
  }
}
