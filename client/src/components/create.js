import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import { GET_COMMUNITIES } from './profilepage'

const CREATE_COMMUNITY_MUTATION = gql`
  mutation CreateMutation(
    $name: String!
    $category: String!
    $hasPosts: Boolean!
    $hasMessages: Boolean!
    $hasEvents: Boolean!
    $privacy: String!
    $about: String!
  ) {
    createNewCommunity(
      name: $name
      category: $category
      hasPosts: $hasPosts
      hasMessages: $hasMessages
      hasEvents: $hasEvents
      privacy: $privacy
      about: $about
    ) {
      id
      name
      slug
    }
  }
`;

export default class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: 'animals',
      hasPosts: true,
      hasEvents: true,
      hasMessages: true,
      privacy: 'Public',
      about: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    const key = event.target.name;
    const updatedValue = { [key]: event.target.value };
    this.setState(updatedValue);
  }

  render() {
    return (
      <div className="community-form-container">
        <div className="community-form">
          <h1>Create A New Community</h1>
          <div className="create-field">
            <label htmlFor="name">Community Name: </label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="create-field">
            <label htmlFor="category">Select A Topic: </label>
            <select
              name="category"
              onChange={event => this.handleOnChange(event)}
              value={this.state.category}
            >
              <option value="animals">Animals</option>"
              <option value="computers">Computers</option>
              <option value="food">Food</option>
              <option value="games">Games</option>
              <option value="health">Health</option>"
              <option value="movies">Movies</option>
              <option value="nature">Nature</option>
              <option value="photography">Photography</option>
              <option value="random">Random</option>"
              <option value="science">Science</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          <div className="create-field">
            <label htmlFor="about">About: </label>
            <textarea
              name="about"
              cols="40"
              rows="5"
              placeholder="Describe your community"
              value={this.state.about}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="create-field">
            <label htmlFor="hasPosts">Has Posts: </label>
            <select
              name="hasPosts"
              onChange={() => this.setState({ hasPosts: !this.state.hasPosts })}
              value={this.state.hasPosts}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="create-field">
            <label htmlFor="hasEvents">Has Events: </label>
            <select
              name="hasEvents"
              onChange={() => this.setState({ hasEvents: !this.state.hasEvents })}
              value={this.state.hasEvents}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="create-field">
            <label htmlFor="hasMessages">Has Messages: </label>
            <select
              name="hasMessages"
              onChange={() =>
                this.setState({ hasMessages: !this.state.hasMessages })
              }
              value={this.state.hasMessages}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="create-field">
            <label htmlFor="privacy">Privacy Settings: </label>
            <select
              name="privacy"
              onChange={this.handleOnChange}
              value={this.state.privacy}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="submit-button">
            <Mutation
              mutation={CREATE_COMMUNITY_MUTATION}
              variables={this.state}
              refetchQueries={() => {
                return [{
                  query: GET_COMMUNITIES
                }]
              }}
              onCompleted={data =>
                this.props.history.push(
                  `community/${data.createNewCommunity.slug}`
                )
              }
            >
              {createMutation => (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={createMutation}
                >
                  Submit
                </Button>
              )}
            </Mutation>
          </div>
        </div>
      </div >
    );
  }
}
