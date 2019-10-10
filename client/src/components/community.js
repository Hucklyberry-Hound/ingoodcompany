import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import About from "./about";
import Posts from "./posts";
import Thread from "./thread";

// do abouts
const GET_COMMUNITY = gql`
  query GetCommunity($slug: String!) {
    getCommunity(slug: $slug) {
      id
      name
      about
      privacy
      posts {
        id
        title
        content
        slug
        postedBy {
          username
        }
      }
    }
  }
`;

export default class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: props.match.params.community
    };
  }

  render() {
    const slug = this.state.slug;
    return (
      <Query query={GET_COMMUNITY} variables={{ slug }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) console.log(error);
          const { name, privacy, about, id, posts } = data.getCommunity;
          return (
            <div className="community">
              <div className="community-header">
                <Link to={`/community/${slug}/about`}>About</Link>
                <Link to={`/community/${slug}/posts`}>Posts</Link>
                <Link to={`/community/${slug}/messages`}>Messages</Link>
              </div>
              <div className="community-container">
                <Switch>
                  {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
                  <Route
                    path="/community/:community/about"
                    render={props => (
                      <About {...props} info={about} name={name} />
                    )}
                  />
                  <Route
                    path="/community/:community/posts"
                    render={props => (
                      <Posts {...props} posts={posts} communityId={id} />
                    )}
                  />
                  <Route
                    path="/community/:community/thread/:postId"
                    component={Thread}
                  />
                </Switch>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
